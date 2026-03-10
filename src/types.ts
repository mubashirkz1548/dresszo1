export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
