import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./modules/categories/categories.component").then(c => c.CategoriesComponent),
    },
    {
        path: "categories",
        loadComponent: () => import("./modules/categories/categories.component").then(c => c.CategoriesComponent)
    },
    {
        path: "category",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent)
    },
    {
        path: "category/:id",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent)
    },
    {
        path: "brands",
        loadComponent: () => import("./modules/brands/brands.component").then(c => c.BrandsComponent)
    },
    {
        path: "brand",
        loadComponent: () => import("./modules/brands/add-brands/add-brands.component").then(c => c.AddBrandsComponent)
    },
    {
        path: "brand/:id",
        loadComponent: () => import("./modules/brands/add-brands/add-brands.component").then(c => c.AddBrandsComponent)
    },
    {
        path: "advertisements",
        loadComponent: () => import("./modules/advertisement/advertisement.component").then(c => c.AdvertisementsComponent)
    },
    {
        path: "advertisement",
        loadComponent: () => import("./modules/advertisement/add-advertisement/add-advertisement.component").then(c => c.AddAdvertisementsComponent)
    },
    {
        path: "advertisement/:id",
        loadComponent: () => import("./modules/advertisement/add-advertisement/add-advertisement.component").then(c => c.AddAdvertisementsComponent)
    },
    {
        path: "Products",
        loadComponent: () => import("./modules/Products/products/products.component").then(p=> p.ProductsComponent)
    },
    {
        path: "Product",
        loadComponent: () => import("./modules/Products/add-products/add-products.component").then(c => c.AddProductsComponent)
    },
    {
        path: "Product/:id",
        loadComponent: () => import("./modules/Products/add-products/add-products.component").then(c => c.AddProductsComponent)
    },
    {
        path: "Reviews/:id",
        loadComponent: () => import("./modules/Reviews/reviews/reviews.component").then(c => c.ReviewsComponent)
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: "categories"
    }
];
