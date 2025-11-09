import Logo from "./image/logo.png";
import Upload_area from "./image/upload_area.png";

export const assets = {
    Logo,
    Upload_area
}

export const blogCategories = ['Todo', 'Tecnologia', 'Viajes', 'Finanzas', 'Comida']

export const blogData = [
    {
    "id": "66129188e9981f4404040a43",
    "titulo": "Las 5 Tendencias de IA que Dominarán 2026",
    "subTitulo": "Análisis detallado y predicciones de los modelos de machine learning y deep learning.",
    "descripcion": "La inteligencia artificial sigue revolucionando industrias. Exploramos cómo el aprendizaje federado, la IA ética y los modelos generativos están marcando el futuro.",
    "categoria": "Technology",
    "image": "",
    "isPublished": true,
    "createdAt": "2025-10-25T10:00:00Z",
    "updatedAt": "2025-10-30T22:30:00Z"
  },
  {
    "id": "2",
    "titulo": "El Secreto del Auténtico Tiramisú Italiano",
    "subTitulo": "Prepáralo en casa con los ingredientes originales y un toque moderno.",
    "descripcion": "Aprende a elaborar este postre clásico con la textura y el sabor inconfundibles. Incluye una versión apta para veganos.",
    "categoria": "Finance",
    "image": "",
    "isPublished": true,
    "createdAt": "2025-10-20T15:30:00Z",
    "updatedAt": "2025-10-20T15:30:00Z"
  },
  {
    "id": "3",
    "titulo": "Guía Esencial para Viajar con Presupuesto por Sudamérica",
    "subTitulo": "Cómo ahorrar en alojamiento, transporte y comida sin sacrificar la experiencia.",
    "descripcion": "Consejos prácticos y rutas recomendadas para mochileros y viajeros con una mentalidad minimalista.",
    "categoria": "Lifestyle",
    "image": "",
    "isPublished": true,
    "createdAt": "2025-09-15T08:45:00Z",
    "updatedAt": "2025-10-01T11:20:00Z"
  }
]

export const dashboard_data = {
    "blogs": 10,
    "comments": 5,
    "drafts": 0,
    "recentBlogs": blogData.slice(0, 5),
}

export const footer_data = [
  {
    "title": "Links",
    "links": ["Home", "Mas vendidos", "Ofertas", "Contáctanos", "FAQ"]
  },
  {
    "title": "¿Necesitas ayuda?",
    "links": ["Información de envio", "Politicas", "Metodos de pago"]
  },
  {
    "title": "Siguenos",
    "links": ["Instagram", "Twitter", "Facebook", "YouTube"]
  }
]

export const comments_data = [
  {
    "_id": "6811ed9e7836a82ba747cb25",
    "blog": "blog_data[0]",
    "name": "Michael Scott",
    "content": "This is my new comment",
    "isApproved": false,
    "createdAt": "2025-04-30T09:30:06.918Z",
    "updatedAt": "2025-04-30T09:30:06.918Z",
    "__v": 0
  },
  {
    "_id": "5f4b3c7d2e9a0f1g8h7j6k5l",
    "blog": "blog_data[1]",
    "name": "Dwight Schrute",
    "content": "Fascinante análisis. ¿Podrían profundizar más en los aspectos de la cadena de suministro mencionados?",
    "isApproved": true,
    "createdAt": "2025-10-15T14:22:10.500Z",
    "updatedAt": "2025-10-15T14:22:10.500Z",
    "__v": 0
  },
  {
    "_id": "9a8b7c6d5e4f3g2h1i0j9k8l",
    "blog": "blog_data[0]",
    "name": "Pam Beesly",
    "content": "¡Me encantó este artículo! La sección sobre diseño UX es especialmente útil.",
    "isApproved": true,
    "createdAt": "2025-11-01T11:05:45.123Z",
    "updatedAt": "2025-11-01T11:05:45.123Z",
    "__v": 0
  }
];