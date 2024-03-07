export type ProductType = {
  id: string;
  name: string;
  shortDescription: string;
  variations: [
    {
      name: string;
      options: [
        {
          id: string;
          name: string;
          quantity: number;
          price: number;
          discountedPrice: number;
        }
      ];
    }
  ];
  discountedPrice: number;
  price: number;
  images: [
    {
      id: string;
      link: string;
    }
  ];
  fullDescription: string;
  tags: string[];
  isFeatured: boolean;
  category: string;
  subcategory: string;
  gender: string;
  createdAt: number;
};

export type CurrentUser = {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  birthDate: number;
  gender: string;
  email: string;
  created: number;
};

export type AuthValue = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Function;
};
