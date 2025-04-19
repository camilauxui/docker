// Navbar.test.tsx  
import React from 'react';  
import { render, screen, fireEvent } from '@testing-library/react';  
import { AuthProvider } from '../components/contexts/AuthContext';   
import { LanguageProvider } from '../components/contexts/LanguageContext';  
import Navbar from './Navbar';   
import { MemoryRouter } from 'react-router-dom';   

const renderWithProviders = (ui) => {  
    return render(  
        <MemoryRouter>  
            <AuthProvider>  
                <LanguageProvider>  
                    {ui}  
                </LanguageProvider>  
            </AuthProvider>  
        </MemoryRouter>  
    );  
};  

describe('Navbar', () => {  
    test('renders navbar with default language (Spanish)', () => {  
        renderWithProviders(<Navbar />);  

        // Verificar que el título en español se muestre correctamente  
        expect(screen.getByText(/Centro Médico/i)).toBeInTheDocument();   
    });  

    test('can change language to English', () => {  
        renderWithProviders(<Navbar />);  

        // Simula el cambio de idioma  
        fireEvent.click(screen.getByText(/English/i));  

        // Verificar que el título cambie a inglés  
        expect(screen.getByText(/Medical Center/i)).toBeInTheDocument();   
    });  
});