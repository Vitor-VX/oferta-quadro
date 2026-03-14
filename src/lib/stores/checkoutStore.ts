import { writable } from 'svelte/store';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface PersonData {
  photo: string;
  selectedTheme: string;
}

export interface CustomerData {
  name: string;
  whatsapp: string;
  email: string;
}

export interface CheckoutState {
  currentStep: number;
  selectedProduct: Product | null;
  selectedExtras: Extra[];
  people: PersonData[];
  customerData: CustomerData;
  totalAmount: number;
  paymentStatus: 'pending' | 'generating' | 'waiting' | 'paid' | 'error';
  pixCode: string;
  pixQrCode: string;
}

const initialState: CheckoutState = {
  currentStep: 0,
  selectedProduct: null,
  selectedExtras: [],
  people: [],
  customerData: {
    name: '',
    whatsapp: '',
    email: '',
  },
  totalAmount: 0,
  paymentStatus: 'pending',
  pixCode: '',
  pixQrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
};

export const checkoutStore = writable<CheckoutState>(initialState);

export const setCurrentStep = (step: number) => {
  checkoutStore.update(state => ({
    ...state,
    currentStep: step
  }));
};

export const selectProduct = (product: Product) => {
  checkoutStore.update(state => {
    const people = Array.from({ length: product.quantity }, () => ({
      photo: '',
      selectedTheme: ''
    }));

    const extrasTotal = state.selectedExtras.reduce((sum, extra) => sum + (extra.selected ? extra.price : 0), 0);

    return {
      ...state,
      selectedProduct: product,
      people,
      totalAmount: product.price + extrasTotal
    };
  });
};

export const toggleExtra = (extraId: string) => {
  checkoutStore.update(state => {
    let updatedExtras = state.selectedExtras.map(extra => {
      if (extra.id === extraId) {
        return { ...extra, selected: !extra.selected };
      }

      return extra;
    });

    const extrasTotal = updatedExtras.reduce(
      (sum, extra) => sum + (extra.selected ? extra.price : 0),
      0
    );

    const productPrice = state.selectedProduct?.price || 0;

    return {
      ...state,
      selectedExtras: updatedExtras,
      totalAmount: productPrice + extrasTotal
    };
  });
};


export const updatePersonData = (index: number, personData: Partial<PersonData>) => {
  checkoutStore.update(state => ({
    ...state,
    people: state.people.map((person, i) =>
      i === index ? { ...person, ...personData } : person
    )
  }));
};

export const updateCustomerData = (customerData: CustomerData) => {
  checkoutStore.update(state => ({
    ...state,
    customerData
  }));
};

export const setPaymentStatus = (status: CheckoutState['paymentStatus']) => {
  checkoutStore.update(state => ({
    ...state,
    paymentStatus: status
  }));
};

export const setPixData = (pixCode: string, pixQrCode: string) => {
  checkoutStore.update(state => ({
    ...state,
    pixCode,
    pixQrCode
  }));
};

export const resetCheckout = () => {
  checkoutStore.set(initialState);
};

export const products: Product[] = [
  {
    id: 'single',
    name: '1 Pet',
    description: '1 quadro de pet personalizado',
    price: 9.90,
    oldPrice: 47.00,
    quantity: 1
  },
  {
    id: 'double',
    name: '2 Pets',
    description: '2 quadros de pets personalizados',
    price: 29.90,
    oldPrice: 94.00,
    quantity: 2
  },
  {
    id: 'triple',
    name: '3 Pets',
    description: '3 quadros de pets personalizados',
    price: 39.90,
    oldPrice: 141.00,
    quantity: 3
  }
];
export const extras: Extra[] = [
  {
    id: 'fast_delivery',
    name: 'Entrega super rápida',
    description: 'Receba em até 2 minutos.',
    price: 4.90,
    selected: false
  },
  {
    id: 'all_styles',
    name: 'Todos os 3 Estilos',
    description: 'Receba o quadro do seu pet nos 3 estilos: Rococó, Renascentista e Céu Épico.',
    price: 10.90,
    selected: false
  }
];

checkoutStore.update(state => ({
  ...state,
  selectedExtras: [...extras]
}));