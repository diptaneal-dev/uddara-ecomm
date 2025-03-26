import React from 'react';
import useUnitTypes from './useUnitTypes';

const UnitSelector = ({ onUnitChange }) => {
    const {
        unitTypes,
        unitsForSelectedType,
        selectedUnitType,
        setSelectedUnitType,
        selectedUnit,
        setSelectedUnit,
        getBackendUnitValue, // Use this function to get the backend unit value
    } = useUnitTypes();

    const handleTypeChange = (e) => {
        const unitType = e.target.value;
        setSelectedUnitType(unitType);
        setSelectedUnit(''); // Reset unit selection
        if (onUnitChange) {
            onUnitChange({ unitType, unit: '' });
        }
    };

    const handleUnitChange = (e) => {
        const unit = e.target.value;
        setSelectedUnit(unit);
        if (onUnitChange) {
            onUnitChange({ unitType: selectedUnitType, unit: backendUnitValue });
        }
    };

    return (
        <div>
            <label htmlFor="unitType" className="form-label">
                Unit Type
            </label>
            <select
                id="unitType"
                className="form-select"
                value={selectedUnitType}
                onChange={handleTypeChange}
            >
                <option value="">Select a unit type</option>
                {unitTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {unitsForSelectedType.length > 0 && (
                <>
                    <label htmlFor="unit" className="form-label mt-2">
                        Unit
                    </label>
                    <select
                        id="unit"
                        className="form-select"
                        value={selectedUnit}
                        onChange={handleUnitChange}
                    >
                        <option value="">Select a unit</option>
                        {unitsForSelectedType.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
};

export default UnitSelector;
