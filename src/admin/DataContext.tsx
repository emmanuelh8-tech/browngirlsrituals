import { supabase } from "@/lib/supabase";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  productsConfig as initialProductsConfig,
  siteConfig as initialSiteConfig,
  heroConfig as initialHeroConfig,
  subHeroConfig as initialSubHeroConfig,
  navigationConfig as initialNavigationConfig,
  videoSectionConfig as initialVideoSectionConfig,
  featuresConfig as initialFeaturesConfig,
  blogConfig as initialBlogConfig,
  faqConfig as initialFaqConfig,
  aboutConfig as initialAboutConfig,
  contactConfig as initialContactConfig,
  footerConfig as initialFooterConfig,
} from "../config";
import type { Product } from "../config";

const defaultTheme = {
  primaryColor: "#8b6d4b",
  primaryDark: "#6d5639",
};

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

interface DataContextType {
  products: Product[];
  siteConfig: typeof initialSiteConfig;
  heroConfig: typeof initialHeroConfig;
  subHeroConfig: typeof initialSubHeroConfig;
  navigationConfig: typeof initialNavigationConfig;
  videoSectionConfig: typeof initialVideoSectionConfig;
  featuresConfig: typeof initialFeaturesConfig;
  blogConfig: typeof initialBlogConfig;
  faqConfig: typeof initialFaqConfig;
  aboutConfig: typeof initialAboutConfig;
  contactConfig: typeof initialContactConfig;
  footerConfig: typeof initialFooterConfig;
  theme: typeof defaultTheme;
  messages: Message[];

  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  updateSiteConfig: (config: any) => void;
  updateHeroConfig: (config: any) => void;
  updateSubHeroConfig: (config: any) => void;
  updateNavigationConfig: (config: any) => void;
  updateVideoSectionConfig: (config: any) => void;
  updateFeaturesConfig: (config: any) => void;
  updateBlogConfig: (config: any) => void;
  updateFaqConfig: (config: any) => void;
  updateAboutConfig: (config: any) => void;
  updateContactConfig: (config: any) => void;
  updateFooterConfig: (config: any) => void;

  updateTheme: (theme: any) => void;

  addMessage: (message: Omit<Message, "id" | "date" | "read">) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  markAllAsRead: () => void;

  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>({
    products: initialProductsConfig.products,
    siteConfig: initialSiteConfig,
    heroConfig: initialHeroConfig,
    subHeroConfig: initialSubHeroConfig,
    navigationConfig: initialNavigationConfig,
    videoSectionConfig: initialVideoSectionConfig,
    featuresConfig: initialFeaturesConfig,
    blogConfig: initialBlogConfig,
    faqConfig: initialFaqConfig,
    aboutConfig: initialAboutConfig,
    contactConfig: initialContactConfig,
    footerConfig: initialFooterConfig,
    theme: defaultTheme,
    messages: [],
  });

  // 🔥 LOAD FROM SUPABASE
  useEffect(() => {
    const loadData = async () => {
      const { data: dbData } = await supabase
        .from("site_content")
        .select("*")
        .eq("id", "main")
        .single();

      if (dbData?.content) {
        setData(dbData.content);
      }
    };

    loadData();
  }, []);

  // 🔥 SAVE TO SUPABASE
  const saveToDB = async (newData: any) => {
    setData(newData);

    await supabase.from("site_content").upsert({
      id: "main",
      content: newData,
    });
  };

  // Product CRUD
  const addProduct = (product: Omit<Product, "id">) => {
    const newId = Math.max(...data.products.map((p: Product) => p.id), 0) + 1;
    saveToDB({
      ...data,
      products: [...data.products, { ...product, id: newId }],
    });
  };

  const updateProduct = (id: number, product: Partial<Product>) => {
    saveToDB({
      ...data,
      products: data.products.map((p: Product) =>
        p.id === id ? { ...p, ...product } : p
      ),
    });
  };

  const deleteProduct = (id: number) => {
    saveToDB({
      ...data,
      products: data.products.filter((p: Product) => p.id !== id),
    });
  };

  // Config updates
  const updateSiteConfig = (config: any) =>
    saveToDB({ ...data, siteConfig: { ...data.siteConfig, ...config } });

  const updateHeroConfig = (config: any) =>
    saveToDB({ ...data, heroConfig: { ...data.heroConfig, ...config } });

  const updateSubHeroConfig = (config: any) =>
    saveToDB({ ...data, subHeroConfig: { ...data.subHeroConfig, ...config } });

  const updateNavigationConfig = (config: any) =>
    saveToDB({ ...data, navigationConfig: { ...data.navigationConfig, ...config } });

  const updateVideoSectionConfig = (config: any) =>
    saveToDB({ ...data, videoSectionConfig: { ...data.videoSectionConfig, ...config } });

  const updateFeaturesConfig = (config: any) =>
    saveToDB({ ...data, featuresConfig: { ...data.featuresConfig, ...config } });

  const updateBlogConfig = (config: any) =>
    saveToDB({ ...data, blogConfig: { ...data.blogConfig, ...config } });

  const updateFaqConfig = (config: any) =>
    saveToDB({ ...data, faqConfig: { ...data.faqConfig, ...config } });

  const updateAboutConfig = (config: any) =>
    saveToDB({ ...data, aboutConfig: { ...data.aboutConfig, ...config } });

  const updateContactConfig = (config: any) =>
    saveToDB({ ...data, contactConfig: { ...data.contactConfig, ...config } });

  const updateFooterConfig = (config: any) =>
    saveToDB({ ...data, footerConfig: { ...data.footerConfig, ...config } });

  const updateTheme = (theme: any) =>
    saveToDB({ ...data, theme: { ...data.theme, ...theme } });

  // Messages
  const addMessage = (message: Omit<Message, "id" | "date" | "read">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    };

    saveToDB({
      ...data,
      messages: [newMessage, ...data.messages],
    });
  };

  const deleteMessage = (id: string) => {
    saveToDB({
      ...data,
      messages: data.messages.filter((m: Message) => m.id !== id),
    });
  };

  const markMessageAsRead = (id: string) => {
    saveToDB({
      ...data,
      messages: data.messages.map((m: Message) =>
        m.id === id ? { ...m, read: true } : m
      ),
    });
  };

  const markAllAsRead = () => {
    saveToDB({
      ...data,
      messages: data.messages.map((m: Message) => ({ ...m, read: true })),
    });
  };

  const resetToDefault = async () => {
    await supabase.from("site_content").update({ content: {} }).eq("id", "main");
    window.location.reload();
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSiteConfig,
        updateHeroConfig,
        updateSubHeroConfig,
        updateNavigationConfig,
        updateVideoSectionConfig,
        updateFeaturesConfig,
        updateBlogConfig,
        updateFaqConfig,
        updateAboutConfig,
        updateContactConfig,
        updateFooterConfig,
        updateTheme,
        addMessage,
        deleteMessage,
        markMessageAsRead,
        markAllAsRead,
        resetToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};