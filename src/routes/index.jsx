import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Students = lazy(() => import("./students/Students.jsx"));
const Auth = lazy(() => import("./auth/Auth.jsx"));
const Login = lazy(() => import("./auth/login/Login.jsx"));
const Private = lazy(() => import("./private/Private.jsx"));
const Details = lazy(() => import("./details/Details.jsx"));
const AdmissionForm = lazy(() => import("./admissionForm/AdmissionForm.jsx"));

const RouteController = () => {
    return useRoutes([
        {
            path: "/",
            element: (
                <Suspense>
                    <Private />
                </Suspense>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Suspense>
                            <Students />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "/auth",
            element: (
                <Suspense>
                    <Auth />
                </Suspense>
            ),
            children: [
                {
                    path: "/auth/login",
                    element: (
                        <Suspense>
                            <Login />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "/students-detail/:id",
            element: (
                <Suspense>
                    <Details />
                </Suspense>
            ),
        },
        {
            path: "/admission-form",
            element: (
                <Suspense>
                    <AdmissionForm />
                </Suspense>
            ),
        },
    ]);
};

export default RouteController;
