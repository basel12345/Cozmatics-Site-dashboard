import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./modules/categories/categories.component").then(c => c.CategoriesComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "categories",
        loadComponent: () => import("./modules/categories/categories.component").then(c => c.CategoriesComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "login",
        loadComponent: () => import("./modules/login/login.component").then(c => c.LoginComponent)
    },
    {
        path: "category",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "category/:id",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "brands",
        loadComponent: () => import("./modules/brands/brands.component").then(c => c.BrandsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "brand",
        loadComponent: () => import("./modules/brands/add-brands/add-brands.component").then(c => c.AddBrandsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "brand/:id",
        loadComponent: () => import("./modules/brands/add-brands/add-brands.component").then(c => c.AddBrandsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "advertisements",
        loadComponent: () => import("./modules/advertisement/advertisement.component").then(c => c.AdvertisementsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "advertisement",
        loadComponent: () => import("./modules/advertisement/add-advertisement/add-advertisement.component").then(c => c.AddAdvertisementsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "advertisement/:id",
        loadComponent: () => import("./modules/advertisement/add-advertisement/add-advertisement.component").then(c => c.AddAdvertisementsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "Products",
        loadComponent: () => import("./modules/Products/products/products.component").then(p=> p.ProductsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "orders",
        loadComponent: () => import("./modules/orders/orders.component").then(p=> p.OrdersComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "order-products",
        loadComponent: () => import("./modules/orders/order-products/order-products.component").then(p=> p.OrderProductsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "Product",
        loadComponent: () => import("./modules/Products/add-products/add-products.component").then(c => c.AddProductsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "users",
        loadComponent: () => import("./modules/users/users.component").then(c => c.UsersComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "Product/:id",
        loadComponent: () => import("./modules/Products/add-products/add-products.component").then(c => c.AddProductsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "Reviews/:id",
        loadComponent: () => import("./modules/Reviews/reviews/reviews.component").then(c => c.ReviewsComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "image-category/:id",
        loadComponent: () => import("./modules/categories/image-category/image-category.component").then(c => c.ImageCategoryComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "image-brand/:id",
        loadComponent: () => import("./modules/brands/image-brand/image-brand.component").then(c => c.ImageBrandComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "image-advertisement/:id",
        loadComponent: () => import("./modules/advertisement/image-advertisement/image-advertisement.component").then(c => c.ImageAdvertisementComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "images-product/:id",
        loadComponent: () => import("./modules/Products/images-product/images-product.component").then(c => c.ImagesProductComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "add-image/:id",
        loadComponent: () => import("./modules/Products/add-image/add-image.component").then(c => c.AddImageComponent),
        canActivate: [authGuard],
        data: {
            role: 1
        }
    },
    {
        path: "AttributeValue/:ProductId/:ProductName",
        loadComponent: () => import("./modules/attributes-values/attributes-values.component").then(c => c.AttributesValuesComponent)
    },
    {
        path: "AttributeValue/:ProductId/:ProductName/:AttrId",
        loadComponent: () => import("./modules/attributes-values/add-atrr-value/add-atrr-value.component").then(c => c.AddAtrrValueComponent)
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: "categories"
    }
];
