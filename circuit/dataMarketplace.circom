pragma circom 2.0.0;

template DatasetMarketPlace() {
    // Private inputs
    signal input rowCount;
    signal input columnCount;
    signal input dataHash; // Hash of the actual dataset
    
    // Public outputs
    signal output isValid;
    signal output hashedData;
    
    // Verify row count is at least 10
    signal rowValid;
    rowValid <-- rowCount >= 10 ? 1 : 0;
    rowValid * (rowValid - 1) === 0; // Constrain to 0 or 1
    rowValid === 1; // Must be valid
    
    // Verify column count is at least 5
    signal colValid;
    colValid <-- columnCount >= 5 ? 1 : 0;
    colValid * (colValid - 1) === 0; // Constrain to 0 or 1
    colValid === 1; // Must be valid
    
    // Set outputs
    isValid <== rowValid * colValid; // Both conditions must be true
    hashedData <== dataHash; // Pass through the hash for verification
}

component main = DatasetMarketPlace();