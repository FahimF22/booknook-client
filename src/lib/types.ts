export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
  addedBy: { name: string; email: string };
  createdAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}
