"use client"

import { useState } from "react"
import { MenuCategory } from "./menu-category"
import { PizzaSlice, Leaf, CoffeeCup, FireFlame } from "iconoir-react"

const categories = [
  { id: "pizza", label: "Pizza", icon: PizzaSlice },
  { id: "rice", label: "Rice", icon: CoffeeCup },
  { id: "fries", label: "Fries", icon: FireFlame },
  { id: "banku", label: "Banku", icon: CoffeeCup },
  { id: "ampesi", label: "Ampesi", icon: Leaf },
  { id: "shawarma", label: "Shawarma", icon: FireFlame },
  { id: "salad", label: "Salad", icon: Leaf },
  { id: "sandwich", label: "Sandwich", icon: CoffeeCup },
  { id: "spaghetti", label: "Spaghetti", icon: CoffeeCup },
]

const menuItems = {
  pizza: [
    {
      name: "Small Pizza",
      price: "GHS 80 - 140",
      description: "Chicken 80, Beef 90, Tuna 100, Mushroom 100, All Seasoning 100, 3 Seconds Special 120, Goat 130, Fully Loaded Special 140.",
      image: "/Pizza/pizza.png",
    },
    {
      name: "Medium Pizza",
      price: "GHS 90 - 170",
      description: "Margarita 90, Chicken 100, Beef 110, Tuna 120, Mushroom 120, All Seasoning 120, 3 Seconds Special 140, Goat 170, Fully Loaded Special 170.",
      image: "/Pizza/pizza2.png",
    },
    {
      name: "Large Pizza",
      price: "GHS 130 - 220",
      description: "Margarita 130, Chicken 150, Beef 160, Tuna 170, Mushroom 170, All Seasoning 170, 3 Seconds Special 190, Goat 220, Fully Loaded Special 220.",
      image: "/Pizza/pizza.png",
    },
    {
      name: "Family Pizza",
      price: "GHS 180 - 300",
      description: "Margarita 180, Chicken 200, Beef 220, Tuna 240, Mushroom 240, All Seasoning 260, 3 Seconds Special 280, Goat 300, Fully Loaded Special 300.",
      image: "/Pizza/pizza2.png",
    },
    {
      name: "Extra Cheese",
      price: "GHS 30",
      description: "Add-on option.",
      image: "/Pizza/pizza.png",
    },
  ],
  rice: [
    {
      name: "Rice Dishes",
      price: "GHS 30 - 150",
      description: "Jollof/Fried Rice with charcoal chicken 30-70, Goat 80-90/80-100, Red Fish 50-70, Assorted 80-150, Egg & Sausage 50-60, Turkey 70-80, Beef/Chicken sauce 80-100.",
      image: "/Fried-Chicken/fried.png",
    },
    {
      name: "Special Rice Dishes",
      price: "GHS 50 - 100",
      description: "Egg Fried Rice + Grilled Chicken 60-70, Vegetable Rice + Grilled Chicken 60-70, Aroni + Grilled Chicken 60-80, Aroni + Goat 80-100, Aroni Red Fish 70-100, Plain Rice + Gravy 50-60, Plain Rice + Moyo 60-80.",
      image: "/Fried-Chicken/fired.png",
    },
  ],
  fries: [
    {
      name: "Fries Dishes",
      price: "GHS 50 - 120",
      description: "French Fries/Yam Chips + Chicken 50-60, + Gizzard 50-60, + Sausage 50-60, + Tilapia 70-100, Loaded Fries 70-120.",
      image: "/Fried-Chicken/fried.png",
    },
  ],
  banku: [
    {
      name: "Banku with Tilapia",
      price: "GHS 60 - 80",
      description: "Banku with Tilapia 60/70/80, with Green + Tilapia 60/70/80, with Moyo + Tilapia 60/70/80.",
      image: "/banku/banku%201.png",
    },
    {
      name: "Banku with Soup & Catfish",
      price: "GHS 60 - 150",
      description: "Banku with Tilapia Light Soup 60/70, Catfish 100/120/150.",
      image: "/banku/banku%202.png",
    },
  ],
  ampesi: [
    {
      name: "Ampesi Dishes",
      price: "GHS 50 - 70",
      description: "Yam Chips + Chicken, Boiled Yam + Egg Stew, Boiled Yam + Palava Sauce, Boiled Yam + Garden Egg Stew, Plantain + Egg Stew, Plantain + Palava Sauce, Plantain + Garden Egg Stew, Plantain + Kontomire Stew.",
      image: "/ampesi/ampesi.png",
    },
  ],
  shawarma: [
    {
      name: "Shawarma Types",
      price: "GHS 50 - 80",
      description: "Beef 55, Chicken 50, Mixed 60, Beef + Fries 75, Chicken + Fries 70, Mixed + Fries 80.",
      image: "/shawama/shawama.png",
    },
  ],
  salad: [
    {
      name: "Salad Dishes",
      price: "GHS 30 - 60",
      description: "Potato 40/50, Beetroot 30/40, Chicken 30/40/50, Tuna 30/40/50, Avocado 40/50, Beef 40/50/60, 3 Seconds Special 50/60, Pasta 30/40/50, Vegetable/Mixed 30/40/50.",
      image: "/salad/salad.png",
    },
  ],
  sandwich: [
    {
      name: "Sandwich Types",
      price: "GHS 40 - 50",
      description: "Egg Sandwich 40, Protein/Vegetable/Club/Tuna Club 40/50, Chicken Burger 40, Beef Burger 40, Cheese Burger 40, Hot Dog 40.",
      image: "/sandwitch/sandwitch.png",
    },
  ],
  spaghetti: [
    {
      name: "Spaghetti Dishes",
      price: "GHS 50 - 100",
      description: "Spaghetti Bolognese 50/60, Assorted Pasta 80/100, Assorted Indomie 50/70/80/100.",
      image: "/spag/sapg.png",
    },
  ],
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("pizza")

  return (
    <section id="menu" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tighter mb-4">OUR MENU</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-medium">
            Updated 3 Seconds Kitchen menu.
          </p>
        </div>

        <div className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-amber-400 to-primary opacity-20 animate-pulse" />
          <div className="relative p-8 text-center border-4 border-primary rounded-3xl bg-card">
            <p className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-2">CALL / WHATSAPP</p>
            <p className="text-xl md:text-2xl font-bold text-foreground">
              <span className="text-primary">0536 991 464</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg tracking-tight transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/50 scale-105"
                    : "bg-card border-2 border-border text-foreground hover:border-primary/50 hover:scale-105"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>

        <MenuCategory items={menuItems[activeCategory as keyof typeof menuItems]} />
      </div>
    </section>
  )
}
