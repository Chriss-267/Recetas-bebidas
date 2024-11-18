import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
const Favorites = lazy(() => import("./views/Favorites"))
const IndePage = lazy(() => import("./views/IndePage"))



function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback = "cargando...">
                            <IndePage/>
                        </Suspense>
                    } />
                    {/**Mejora el performance descarga luego esta pagina */}
                    <Route path="/favoritos" element={
                        <Suspense fallback = "cargando...">
                            <Favorites/>
                        </Suspense>
                    } />


                </Route>


            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter