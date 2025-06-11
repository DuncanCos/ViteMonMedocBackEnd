const validateItemData = (data) => {
    const { name, description, price } = data;
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid item name');
    }
    if (!description || typeof description !== 'string') {
        throw new Error('Invalid item description');
    }
    if (price === undefined || typeof price !== 'number') {
        throw new Error('Invalid item price');
    }
    return true;
};

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
};

module.exports = {
    validateItemData,
    handleError,
};