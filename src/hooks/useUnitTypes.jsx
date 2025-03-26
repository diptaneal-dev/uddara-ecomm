import { useState, useMemo } from 'react';

const UNIT_TYPES = {
    Weight: ['Grams (g)', 'Kilograms (kg)', 'Ounces (oz)', 'Pounds (lb)'],
    Volume: [
        'Milliliters (ml)',
        'Liters (L)',
        'Fluid Ounces (fl oz)',
        'Cups',
        'Teaspoons (tsp)',
        'Tablespoons (tbsp)',
    ],
    Count: ['Pieces'],
};

// Mapping of display names to backend-friendly values
const UNIT_TYPE_BACKEND_MAPPING = {
    'Weight' : 'WEIGHT',
    'Grams (g)': 'WEIGHT',
    'Kilograms (kg)': 'WEIGHT',
    'Ounces (oz)': 'WEIGHT',
    'Pounds (lb)': 'WEIGHT',
    'Milliliters (ml)': 'VOLUME',
    'Liters (L)': 'VOLUME',
    'Fluid Ounces (fl oz)': 'VOLUME',
    'Cups': 'VOLUME',
    'Teaspoons (tsp)': 'VOLUME',
    'Tablespoons (tbsp)': 'VOLUME',
    'Pieces': 'COUNT',
    'Volume': 'VOLUME',
    'Count': 'COUNT',
};

// Function to get the backend unit type value for a selected unit
export const getBackendUnitValue = (unit) => UNIT_TYPE_BACKEND_MAPPING[unit];

const useUnitTypes = () => {
    const [selectedUnitType, setSelectedUnitType] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');

    // Get units for the currently selected unit type
    const unitsForSelectedType = useMemo(
        () => (selectedUnitType ? UNIT_TYPES[selectedUnitType] || [] : []),
        [selectedUnitType]
    );

    return {
        unitTypes: Object.keys(UNIT_TYPES), // Array of unit types
        unitsForSelectedType, // Units for the currently selected unit type
        selectedUnitType, // Currently selected unit type
        setSelectedUnitType, // Function to set the selected unit type
        selectedUnit, // Currently selected unit
        setSelectedUnit, // Function to set the selected unit
        getBackendUnitValue, // Function to map the display unit to the backend unit type
    };
};

export default useUnitTypes;
