import Client from '../models/Client.js';

// --- 1. GET CLIENT PROFILE ---
// @desc    Get current user's client profile
// @route   GET /api/client/profile
export const getClientProfile = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user._id }).populate('user', 'name email');
    
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// --- 2. CREATE/UPDATE CLIENT PROFILE ---
// @desc    Upsert client details (Personalization & Preferences)
// @route   POST /api/client/profile
export const updateClientProfile = async (req, res) => {
  const { phoneNumber, dateOfBirth, gender, preferences } = req.body;

  try {
    // Find existing profile or create a new one (Upsert)
    let client = await Client.findOne({ user: req.user._id });

    if (client) {
      // Update existing
      client.phoneNumber = phoneNumber || client.phoneNumber;
      client.dateOfBirth = dateOfBirth || client.dateOfBirth;
      client.gender = gender || client.gender;
      client.preferences = preferences || client.preferences;
      
      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      // Create new
      const newClient = new Client({
        user: req.user._id,
        phoneNumber,
        dateOfBirth,
        gender,
        preferences
      });
      const createdClient = await newClient.save();
      res.status(201).json(createdClient);
    }
  } catch (error) {
    res.status(400).json({ message: "Profile update failed", error: error.message });
  }
};

// --- 3. ADD SAVED ADDRESS ---
// @desc    Add a new address to the address book
// @route   POST /api/client/address
export const addAddress = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user._id });
    if (!client) return res.status(404).json({ message: "Client profile not found" });

    const { label, address, city, postalCode, country } = req.body;
    
    client.savedAddresses.push({ label, address, city, postalCode, country });
    await client.save();
    
    res.status(201).json({ message: "Address added to your Registry", addresses: client.savedAddresses });
  } catch (error) {
    res.status(400).json({ message: "Failed to add address", error: error.message });
  }
};

// --- 4. DELETE ADDRESS ---
// @desc    Remove an address by its sub-document ID
// @route   DELETE /api/client/address/:addressId
export const deleteAddress = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user._id });
    if (!client) return res.status(404).json({ message: "Client profile not found" });

    // Filter out the address with the matching ID
    client.savedAddresses = client.savedAddresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );

    await client.save();
    res.json({ message: "Address removed", addresses: client.savedAddresses });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
};