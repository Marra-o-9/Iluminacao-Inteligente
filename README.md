# Iluminação Inteligente 🌟

## Descrição do Projeto
Este é um aplicativo de **controle de iluminação inteligente** desenvolvido com **React Native** no frontend e **Node.js** no backend. O objetivo do projeto é promover eficiência energética em ambientes urbanos, monitorando e controlando a iluminação pública com base em dados de luminosidade natural.

---

## Funcionalidades 🛠️
1. **Controle Manual de Iluminação**:
   - Ajuste da intensidade da iluminação pública.
   - Ligação/desligamento da iluminação artificial.
   
2. **Simulação de Luz Natural e Artificial**:
   - Simulação da luz natural com base na hora do dia.
   - Ajuste automático da iluminação artificial inversamente proporcional à luz natural.

3. **Visualização de Dados em Tempo Real**:
   - Gráfico atualizado a cada segundo.
   - Gráfico atualizado a cada minuto.
   - Histórico de luz natural e artificial das últimas horas.

4. **Autenticação de Usuário**:
   - Registro e login de usuários com autenticação por **JWT**.

5. **Simulação Responsiva**:
   - Interface dinâmica com gráficos responsivos.

---

## Estrutura do Projeto 📂

### **Frontend**
- **Tecnologias**: React Native, NativeBase, Expo.
- Diretório: `/frontend`.
- Funcionalidades principais:
  - Interface gráfica.
  - Comunicação com a API.
  - Visualização e controle de gráficos.

### **Backend**
- **Tecnologias**: Node.js, Express.js, SQLite.
- Diretório: `/backend`.
- Funcionalidades principais:
  - Simulação da luz natural e artificial.
  - Rotas protegidas com autenticação.
  - Geração de dados históricos.

---

## Requisitos 🧰

### **Frontend**
- Node.js (>= 16.x.x)
- Expo CLI (>= 5.x.x)

### **Backend**
- Node.js (>= 16.x.x)
- SQLite (>= 3.x.x)

### **Bibliotecas Utilizadas**
- **Frontend**:
  - `react-native-svg`
  - `react-native-chart-kit`
  - `native-base`
  - `react-navigation`
  - `expo`

- **Backend**:
  - `express`
  - `sqlite3`
  - `jsonwebtoken`
  - `bcryptjs`

---

## Configuração e Execução ⚙️

### **Backend**
1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` com a seguinte configuração:
   ```plaintext
   JWT_SECRET=seu_segredo_jwt
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
   O backend estará disponível em: `http://localhost:3000`.

---

### **Frontend**
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor Expo:
   ```bash
   expo start
   ```
4. Escaneie o QR Code com o aplicativo **Expo Go** ou inicie no emulador.

---

## Rotas da API 🌐

### **Autenticação**
- **POST** `/api/auth/register`:
  - Registra um novo usuário.
  - **Body**:
    ```json
    {
      "username": "usuario",
      "password": "senha"
    }
    ```
- **POST** `/api/auth/login`:
  - Autentica um usuário.
  - **Body**:
    ```json
    {
      "username": "usuario",
      "password": "senha"
    }
    ```

### **Luzes**
- **GET** `/api/lights/status`:
  - Retorna o status atual da luz (natural e artificial).
- **POST** `/api/lights/update`:
  - Atualiza a iluminação pública.
  - **Body**:
    ```json
    {
      "isOn": true,
      "intensity": 70
    }
    ```
- **GET** `/api/lights/historical`:
  - Retorna os dados históricos de luz das últimas 24 horas.

---

## Funcionalidades do Frontend 📱

### **Tela Inicial (HomeScreen)**
- **Status Atual da Luz**:
  - Exibe a porcentagem da luz natural e artificial.
- **Controle de Iluminação Pública**:
  - Alternar entre ligada/desligada.
  - Ajustar intensidade com um *slider*.
- **Gráficos**:
  - Atualização por segundo.
  - Atualização por minuto.
  - Histórico das últimas horas.

### **Tela de Login e Registro**
- Login com autenticação JWT.
- Registro de novos usuários.

---

## Design Responsivo 🎨
O projeto utiliza o **NativeBase** para estilização, garantindo:
- Temas claros e escuros.
- Estilos responsivos para dispositivos móveis.

---

## Contribuições 🤝
Contribuições são bem-vindas! Siga os passos:
1. Faça um *fork* do repositório.
2. Crie um *branch* para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça *commit* das mudanças:
   ```bash
   git commit -m "Adicionei uma nova funcionalidade"
   ```
4. Envie o *pull request*.

---

## Licença 📜
Este projeto está sob a licença **MIT**.

---
