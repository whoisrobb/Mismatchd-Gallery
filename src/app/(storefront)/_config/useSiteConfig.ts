"use client";

import { useEffect, useState } from 'react';
import { getCategories } from "@/actions/site";

export interface SiteNavItem {
    title: string;
    href: string;
    description: string;
    items: SiteNavItem[];
}

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    siteNav: {
        title: string;
        items: SiteNavItem[];
    };
    mainNav: {
        title: string;
        items: SiteNavItem[];
    }[];
}

export function useSiteConfig() {
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteConfig = async () => {
            try {
                const categories = await getCategories();
                const config = {
                    name: "Mismatchd",
                    description: "An ecommerce app with an integrated CMS dashboard built with Next Js and PostgreSQL.",
                    url: "https://mismatchd-gallery.vercel.app",
                    ogImage: "",
                    siteNav: {
                        title: "Store-front",
                        items: [
                            {
                                title: "Products",
                                href: "/products",
                                description: "All the products we have to offer.",
                                items: [],
                            },
                            {
                                title: "Blog",
                                href: "/blog",
                                description: "Read our latest blog posts.",
                                items: [],
                            },
                            {
                                title: "Contact me",
                                href: "mailto:developedbyrobbie@gmail.com",
                                description: "Reach out to me.",
                                items: [],
                            },
                        ],
                    },
                    mainNav: categories!.map((category) => ({
                        title: category.title,
                        items: [
                            {
                                title: "All",
                                href: `/products?category=${category.title}`,
                                description: `All ${category.title}.`,
                                items: [],
                            },
                            ...category.subcategories.map((subcategory) => ({
                                title: subcategory.title,
                                href: `/products?subCategory=${subcategory.title}`,
                                description: subcategory.description,
                                items: [],
                            })),
                        ],
                    })),
                };
                setSiteConfig(config);
            } catch (error) {
                console.error('Failed to fetch site config:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSiteConfig();
    }, []);

    return { siteConfig, loading };
}