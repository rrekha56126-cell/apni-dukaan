import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Shop = {
    shopId : Text;
    ownerName : Text;
    shopName : Text;
    category : Text;
    description : Text;
    address : Text;
    city : Text;
    phoneNumber : Text;
    whatsappNumber : Text;
    openingHours : Text;
    imageUrl : Text;
    createdAt : Time.Time;
  };

  module Shop {
    public func compare(shop1 : Shop, shop2 : Shop) : Order.Order {
      switch (Text.compare(shop1.shopName, shop2.shopName)) {
        case (#equal) { Text.compare(shop1.shopId, shop2.shopId) };
        case (order) { order };
      };
    };
  };

  let shops = Map.empty<Text, Shop>();

  func validateText(text : Text, maxLength : Nat) : () {
    if (text.size() == 0 or text.size() > maxLength) {
      Runtime.trap("Text must be between 1 and " # maxLength.toText() # " characters");
    };

    for (char in text.chars()) {
      if (char == '<' or char == '>') {
        Runtime.trap("Text cannot contain < or > characters");
      };
    };
  };

  func validatePhoneNumber(phone : Text) : () {
    var digitCount = 0;
    for (char in phone.chars()) {
      if (char >= '0' and char <= '9') {
        digitCount += 1;
      };
    };
    if (digitCount < 10 or digitCount > 15) {
      Runtime.trap("Phone number must be between 10 and 15 digits");
    };
  };

  public shared ({ caller }) func registerShop(
    shopId : Text,
    ownerName : Text,
    shopName : Text,
    category : Text,
    description : Text,
    address : Text,
    city : Text,
    phoneNumber : Text,
    whatsappNumber : Text,
    openingHours : Text,
    imageUrl : Text,
  ) : async () {
    validateText(ownerName, 50);
    validateText(shopName, 100);
    validateText(category, 30);
    validateText(description, 500);
    validateText(address, 150);
    validateText(city, 50);
    validatePhoneNumber(phoneNumber);

    let shop : Shop = {
      shopId;
      ownerName;
      shopName;
      category;
      description;
      address;
      city;
      phoneNumber;
      whatsappNumber;
      openingHours;
      imageUrl;
      createdAt = Time.now();
    };

    switch (shops.get(shopId)) {
      case (?_) { Runtime.trap("Shop with this ID already exists") };
      case (null) {
        shops.add(shopId, shop);
      };
    };
  };

  public query ({ caller }) func getAllShops() : async [Shop] {
    shops.values().toArray().sort();
  };

  public query ({ caller }) func getShopsByCategory(category : Text) : async [Shop] {
    let filtered = shops.values().filter(
      func(shop) { Text.compare(shop.category, category) == #equal }
    );
    filtered.toArray().sort();
  };

  public query ({ caller }) func getShopsByCity(city : Text) : async [Shop] {
    let filtered = shops.values().filter(
      func(shop) { Text.compare(shop.city, city) == #equal }
    );
    filtered.toArray().sort();
  };

  public query ({ caller }) func getShop(shopId : Text) : async Shop {
    switch (shops.get(shopId)) {
      case (?shop) { shop };
      case (null) { Runtime.trap("Shop not found") };
    };
  };
};
