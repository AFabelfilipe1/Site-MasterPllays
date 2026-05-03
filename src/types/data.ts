import { Video, Plan } from './index';

export const VIDEOS: Video[] = [
  {
    id: '13',
    youtubeId: 'zDLGiBsD2W4',
    title: 'Minecraft Sobrevivência: #1 Sobreviver sozinho no meio do nada',
    thumbnail: 'https://img.youtube.com/vi/zDLGiBsD2W4/sddefault.jpg',
    category: 'Games',
    duration: '15:32',
    views: '449',
    uploadDate: '2026-04-29',
    isNew: true,
    isFeatured: true,
    description: 'Iniciando uma nova jornada de sobrevivência no Minecraft! Começando do zero, sozinho no meio do nada. Vamos construir uma base, conseguir recursos e aprender a sobreviver neste mundo hostil.',
    creator: 'GamerPlayer',
    tags: ['Minecraft', 'Gameplay', 'Sobrevivência', 'Let\'s Play']
  },
  {
    id: '1',
    youtubeId: '1',
    title: 'Tutorial React Avançado - Hooks e Context API',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    category: 'Programação',
    duration: '45:30',
    views: '12.5K',
    uploadDate: '2024-12-20',
    isNew: true,
    isFeatured: true,
    description: 'Aprenda os conceitos avançados do React com hooks modernos e gerenciamento de estado global.',
    creator: 'DevMaster',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    youtubeId: '2',
    title: 'Design de Interfaces Modernas com Figma',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    category: 'Design',
    duration: '32:15',
    views: '8.2K',
    uploadDate: '2024-12-18',
    description: 'Crie interfaces incríveis e modernas usando as melhores práticas do Figma.',
    creator: 'DesignPro',
    tags: ['Figma', 'UI/UX', 'Design']
  },
  {
    id: '3',
    youtubeId: '3',
    title: 'Machine Learning Básico - Introdução à IA',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
    category: 'IA',
    duration: '28:45',
    views: '15.7K',
    uploadDate: '2024-12-15',
    isNew: true,
    description: 'Descubra os fundamentos da Inteligência Artificial e Machine Learning.',
    creator: 'AI Expert',
    tags: ['Machine Learning', 'Python', 'IA']
  },
  {
    id: '4',
    youtubeId: '4',
    title: 'Fotografia Profissional - Técnicas Avançadas',
    thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=225&fit=crop',
    category: 'Fotografia',
    duration: '52:20',
    views: '6.9K',
    uploadDate: '2024-12-12',
    description: 'Domine técnicas profissionais de fotografia e edição de imagens.',
    creator: 'PhotoMaster',
    tags: ['Fotografia', 'Camera', 'Edição']
  },
  {
    id: '5',
    youtubeId: '5',
    title: 'Produção de Música Eletrônica 2024',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    category: 'Música',
    duration: '38:12',
    views: '9.3K',
    uploadDate: '2024-12-10',
    description: 'Aprenda a produzir tracks eletrônicos com equipamentos modernos.',
    creator: 'MusicProducer',
    tags: ['Música', 'Produção', 'Eletrônica']
  },
  {
    id: '6',
    youtubeId: '6',
    title: 'Viagem pelo Mundo - Destinos Incríveis',
    thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop',
    category: 'Viagem',
    duration: '41:33',
    views: '11.1K',
    uploadDate: '2024-12-08',
    description: 'Explore os destinos mais incríveis do mundo com dicas exclusivas.',
    creator: 'TravelExplorer',
    tags: ['Viagem', 'Turismo', 'Aventura']
  },
  {
    id: '7',
    youtubeId: '7',
    title: 'Jogos Indie - Descobertas 2024',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop',
    category: 'Games',
    duration: '29:45',
    views: '18.2K',
    uploadDate: '2024-12-05',
    isNew: true,
    description: 'Conheça os melhores jogos indie lançados neste ano.',
    creator: 'GameReviewer',
    tags: ['Games', 'Indie', 'Reviews']
  },
  {
    id: '8',
    youtubeId: '8',
    title: 'Culinária Gourmet - Receitas Premium',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
    category: 'Culinária',
    duration: '35:20',
    views: '7.8K',
    uploadDate: '2024-12-03',
    description: 'Receitas gourmet preparadas por chefs renomados.',
    creator: 'ChefGourmet',
    tags: ['Culinária', 'Receitas', 'Gourmet']
  },
  {
    id: '9',
    youtubeId: '9',
    title: 'Fitness e Saúde - Rotina Completa',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop',
    category: 'Fitness',
    duration: '42:10',
    views: '14.6K',
    uploadDate: '2024-12-01',
    description: 'Rotina completa de exercícios e dicas de saúde.',
    creator: 'FitnessCoach',
    tags: ['Fitness', 'Saúde', 'Exercícios']
  },
  {
    id: '10',
    youtubeId: '10',
    title: 'Desenvolvimento Mobile com React Native',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
    category: 'Programação',
    duration: '55:20',
    views: '22.1K',
    uploadDate: '2024-12-05',
    isNew: true,
    description: 'Crie aplicativos móveis incríveis com React Native.',
    creator: 'MobileDev',
    tags: ['React Native', 'Mobile', 'JavaScript']
  },
  {
    id: '11',
    youtubeId: '11',
    title: 'Ilustração Digital - Do Básico ao Avançado',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=225&fit=crop',
    category: 'Design',
    duration: '48:15',
    views: '9.8K',
    uploadDate: '2024-12-04',
    description: 'Aprenda ilustração digital com técnicas profissionais.',
    creator: 'DigitalArtist',
    tags: ['Design', 'Ilustração', 'Digital']
  },
  {
    id: '12',
    youtubeId: '12',
    title: 'Deep Learning com TensorFlow',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
    category: 'IA',
    duration: '67:30',
    views: '16.4K',
    uploadDate: '2024-12-02',
    isNew: true,
    description: 'Implemente redes neurais profundas com TensorFlow.',
    creator: 'DataScientist',
    tags: ['TensorFlow', 'Machine Learning', 'IA']
  }
];

export const PLANS: Plan[] = [
  {
    nome: 'Básico',
    preco: 'R$ 19,90/mês',
    recursos: ['Acesso a vídeos básicos', 'Qualidade SD', '1 tela simultânea']
  },
  {
    nome: 'Premium',
    preco: 'R$ 39,90/mês',
    recursos: ['Acesso a todos os vídeos', 'Qualidade Full HD', '3 telas simultâneas', 'Conteúdo exclusivo']
  },
  {
    nome: 'Master',
    preco: 'R$ 59,90/mês',
    recursos: ['Acesso a todos os vídeos', 'Qualidade 4K', 'Telas ilimitadas', 'Conteúdo exclusivo', 'Suporte prioritário']
  }
];

export const VIDEO_CATEGORIES = ['Todos', 'Programação', 'Design', 'IA', 'Fotografia', 'Música', 'Viagem', 'Games', 'Culinária', 'Fitness'];
