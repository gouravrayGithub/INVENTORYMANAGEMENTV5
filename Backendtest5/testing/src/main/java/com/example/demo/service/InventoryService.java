package com.example.demo.service;

import com.example.demo.model.InventoryItem;
import com.example.demo.repository.InventoryRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Add inventory item
    public String addInventoryItem(InventoryItem item) {
        inventoryRepository.save(item); // Use save to add the item
        return "Item added successfully"; // Return success message
    }

    // Update inventory item
    public String updateInventoryItem(Long id, InventoryItem updatedItem) {
        if (inventoryRepository.existsById(id)) {
            updatedItem.setId(id); // Set the correct ID for the update
            inventoryRepository.save(updatedItem);
            return "Item updated successfully";
        }
        return "Item not found"; // If the item doesn't exist
    }
 // Delete inventory item
    public String deleteInventoryItem(Long id) {
        if (inventoryRepository.existsById(id)) {
            inventoryRepository.deleteById(id);
            return "Item deleted successfully";
        }
        return "Item not found";
    }
 // Get all inventory items
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryRepository.findAll();
    }
 // Search inventory item by product name (partial match, case-insensitive)
    public List<InventoryItem> searchInventoryByName(String name) {
        return inventoryRepository.findByNameContainingIgnoreCase(name);
    }

}
