import React, { useState, useEffect } from 'react';
import { obtenerProductos, eliminarProducto } from '../firebase/firestoreService.js';
import EditarProducto from './EditarProducto.jsx';