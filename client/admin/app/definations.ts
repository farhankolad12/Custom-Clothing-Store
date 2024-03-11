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
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  variations: AttributesType[];
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
