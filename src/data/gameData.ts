import { LevelData } from './types';

export const GAME_DATA: LevelData[] = [
  {
    id: 1,
    title: 'Configuració IP',
    description: 'La xarxa local ha perdut la connectivitat. Necessitem configurar manualment un equip per accedir al router de gestió. El router està a la 192.168.1.1.',
    type: 'config',
    explanation: 'Una configuració IP correcte requereix una IP dins el mateix rang (192.168.1.x), la màscara de subxarxa estàndard (255.255.255.0) i la porta d\'enllaç (gateway) del router.',
    task: {
      requiredIp: '192.168.1.',
      requiredMask: '255.255.255.0',
      requiredGateway: '192.168.1.1'
    }
  },
  {
    id: 2,
    title: 'Diagnòstic de Xarxa',
    description: 'Hem restablert la IP, però alguns equips no responen. Quina eina de línia de comandes és la més adequada per cada cas?',
    type: 'quiz',
    explanation: 'Ping verifica connectivitat, Tracert mostra la ruta, i Nslookup s\'usa per consultes DNS.',
    task: [
      {
        question: 'Vols saber si un servidor a Google està actiu.',
        options: ['ping google.com', 'ipconfig /all', 'netstat -an', 'get-service'],
        correct: 0
      },
      {
        question: 'Vols veure per quins nodes passa el teu paquet abans d\'arribar al destí.',
        options: ['ping', 'tracert', 'nslookup', 'route print'],
        correct: 1
      },
      {
        question: 'Vols veure la teva configuració MAC i DNS local.',
        options: ['ping /all', 'ipconfig /all', 'arp -a', 'hostname'],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: 'Servidor DNS',
    description: 'Els usuaris es queixen que poden fer ping a les IPs però no poden obrir pàgines web per nom. Configura el servidor DNS correctament.',
    type: 'dns',
    explanation: 'El DNS (Domain Name System) tradueix noms de domini (com google.com) en adreces IP. Si falla, la navegació per noms no funciona.',
    task: {
      mappings: [
        { name: 'intranet.empresa.local', ip: '10.0.0.5' },
        { name: 'mail.empresa.local', ip: '10.0.0.10' },
        { name: 'cloud.empresa.local', ip: '10.0.0.20' }
      ]
    }
  },
  {
    id: 4,
    title: 'Servidor DHCP',
    description: 'Hi ha un conflicte d\'adreces IP a la xarxa. Sembla que el servidor DHCP està assignant rangs que ja estan ocupats per servidors fixos.',
    type: 'dhcp',
    explanation: 'El DHCP (Dynamic Host Configuration Protocol) assigna IPs automàticament. Cal evitar que el rang dinàmic (pool) coincideixi amb IPs estàtiques de servidors.',
    task: {
      staticIps: ['192.168.1.1', '192.168.1.2', '192.168.1.10', '192.168.1.11'],
      pools: [
        { range: '192.168.1.100 - 192.168.1.200', valid: true },
        { range: '192.168.1.1 - 192.168.1.50', valid: false },
        { range: '192.168.1.200 - 192.168.1.250', valid: true }
      ]
    }
  },
  {
    id: 5,
    title: 'Seguretat: Firewall',
    description: 'Últim pas! Bloqueja el trànsit no desitjat però permet que els serveis essencials funcionin. Hem de tancar el port de Telnet (risc alt) i rebre correu (SMTP).',
    type: 'firewall',
    explanation: 'El Firewall filtra el trànsit per ports i protocols. HTTP (80/443), SMTP (25), SSH (22) solen ser permesos, mentre que Telnet (23) és insegur.',
    task: [
      { service: 'HTTP (Web)', port: 80, action: 'allow', required: true },
      { service: 'Telnet (Insegur)', port: 23, action: 'block', required: true },
      { service: 'SMTP (Correu)', port: 25, action: 'allow', required: true },
      { service: 'Malware Port', port: 666, action: 'block', required: true }
    ]
  }
];
