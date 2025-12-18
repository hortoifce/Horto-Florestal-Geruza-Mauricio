"use client"

import { useState } from "react"
import { TreePine, Bird, Bolt, CircleFadingPlus } from "lucide-react"
import { TreeForm } from "@/components/tree-form"
import { AnimalForm } from "@/components/animal-form"
import { CatalogContent } from "./catalog-content"
import { RegisterForm } from "./register-form"

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState<"trees" | "animals" | "catalogo" | "register">("trees")

  return (
    <div className="p-8">
      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("trees")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "trees"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            <TreePine className="w-5 h-5" />
            Árvores
          </button>
          <button
            onClick={() => setActiveTab("animals")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "animals"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            <Bird className="w-5 h-5" />
            Animais
          </button>
          <button
            onClick={() => setActiveTab("catalogo")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "catalogo"
              ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            <Bolt className="w-5 h-5" />
            Catalogo
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "register"
              ? "border-purple-500 text-purple-600 dark:text-purple-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            <CircleFadingPlus className="w-5 h-5" />
            Novo Admin
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-form rounded-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors">
        {activeTab === "trees" && <TreeForm />}
        {activeTab === "animals" && <AnimalForm />}
        {activeTab === "catalogo" && <CatalogContent />}
        {activeTab === "register" && <RegisterForm />}
      </div>
    </div>
  )
}
