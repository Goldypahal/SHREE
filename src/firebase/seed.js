import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { products } from '../data/products';

export const seedProducts = async () => {
  try {
    // 1. Clear existing products (optional, for clean start)
    const querySnapshot = await getDocs(collection(db, 'products'));
    for (const d of querySnapshot.docs) {
      await deleteDoc(doc(db, 'products', d.id));
    }

    // 2. Add products
    for (const product of products) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date()
      });
    }
    console.log('Database Seeded Successfully');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
};
