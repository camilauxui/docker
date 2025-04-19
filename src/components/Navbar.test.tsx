// Navbar.test.tsx  
import { render, screen, fireEvent } from '@testing-library/react';  
import { LanguageProvider } from '../components/contexts/LanguageContext'; 
import { AuthProvider } from '../components/contexts/AuthContext'; 
import React from 'react';
import Navbar from '../components/Navbar'; 

const renderWithProviders = (ui) => {  
    return render(  
        <LanguageProvider>  
            <AuthProvider>  
                {ui}  
            </AuthProvider>  
        </LanguageProvider>  
    );  
};  

describe('Navbar', () => {  
    test('renders navbar with default language (English)', () => {  
        renderWithProviders(<Navbar />);  

        expect(screen.getByText(/Medical Center/i)).toBeInTheDocument(); // Título en inglés  
        expect(screen.getByText(/Logout/i)).toBeInTheDocument(); // Verifica el botón de cerrar sesión en inglés  
    });  

    test('changes language to Spanish when Español button is clicked', () => {  
        renderWithProviders(<Navbar />);  

        // Cambiar a español  
        fireEvent.click(screen.getByText(/Español/i));  

        // Verificar que el título cambie a español  
        expect(screen.getByText(/Centro Médico/i)).toBeInTheDocument(); // Título en español  
        expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument(); // Verifica el botón de cerrar sesión en español  
    });  

    test('changes language to English when English button is clicked', () => {  
        renderWithProviders(<Navbar />);  

        // Cambiar a español primero para verificar el cambio por segunda vez  
        fireEvent.click(screen.getByText(/Español/i));  

        // Cambiar a inglés  
        fireEvent.click(screen.getByText(/English/i));  

        // Verifica que el título vuelva a inglés  
        expect(screen.getByText(/Medical Center/i)).toBeInTheDocument(); // Título en inglés  
        expect(screen.getByText(/Logout/i)).toBeInTheDocument(); // Verifica el botón de cerrar sesión en inglés  
    });  
});