export type CurrentUser = {
  _id: string;
};

export type AuthValue = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Function;
};

export type AttributesType = {
  _id: string;
  title: string;
  displayName: string;
  type: string;
  values: [
    {
      id: string;
      variant: string;
    }
  ];
  options: [
    {
      id: string;
      variant: string;
    }
  ];
};

export type CategoriesType = {
  _id: string;
  icon: {
    id: string;
    link: string;
  };
  name: string;
  description: string;
};

export type ProductType = {
  quantity: number;
  selectedCombination: {
    id: string;
    price: number;
    salePrice: number;
    combinations: [
      {
        id: string;
        variant: string;
        parentName: string;
      }
    ];
  };
  combinations: [
    {
      id: string;
      price: number;
      salePrice: number;
      combinations: [
        {
          id: string;
          varaint: string;
        }
      ];
    }
  ];
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  variants: AttributesType[];
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
  createdAt: number;
};
