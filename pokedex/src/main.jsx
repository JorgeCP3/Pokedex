import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaPokemons from './pages/pokemones/ListaPokemons.jsx';
import FormPokemon from './pages/pokemones/FormPokemon.jsx';
import ListaTipos from './pages/ListaTipo/ListaTipos.jsx';
import FormTipo from './pages/ListaTipo/FormTipo.jsx';
import ListaHabilidades from './pages/ListaHabilidades/ListaHabilidades.jsx';
import FormHabilidades from './pages/ListaHabilidades/FormHabilidades.jsx';
import UploadImgPokemon from './pages/pokemones/UploadImgPokemon.jsx';
import UploadImgTipo from './pages/ListaTipo/UploadImgTipo.jsx';
import PokemonInfo from './pages/Pokedex/pokemonInfo.jsx';
import FormLineaEvolutiva from './pages/pokemones/FormLineaEvolutiva.jsx';

import Pokedex from './pages/Pokedex/Pokedex.jsx';

const router = createBrowserRouter([

  {
    path: '/helloworld',
    element: <App />
  },
  {
    path: '/admin/pokemones',
    element: <ListaPokemons />
  },
  {
    path: '/admin/pokemones/:id',
    element: <FormPokemon />
  },
  {
    path: '/admin/pokemones/nuevo',
    element: <FormPokemon />
  },
  {
    path : '/',
    element: <App />
  },
  {
    path: '/admin/tipos',
    element: <ListaTipos />
  },
  {
    path: '/admin/tipos/:id',
    element: <FormTipo />
  },
  {
    path: '/admin/tipos/nuevo',
    element: <FormTipo />
  },
  {
    path: '/admin/habilidades',
    element: <ListaHabilidades />
  },
  {
    path: '/admin/habilidades/:id',
    element: <FormHabilidades />
  },
  {
    path: '/admin/habilidades/nuevo',
    element: <FormHabilidades />
  },
  {
    path: '/admin/pokemones/:id/foto',
    element: <UploadImgPokemon />
  },
  {
    path: '/admin/tipos/:id/foto',
    element: <UploadImgTipo />
  },
  {
    path: '/pokedex',
    element: <Pokedex />
  },
  {
    path: '/pokedex/:id',
    element: <PokemonInfo />
  },
  {
    path: '/admin/pokemones/:id/evolutiva',
    element: <FormLineaEvolutiva />
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
