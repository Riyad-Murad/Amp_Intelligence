#include <WiFi.h>
#include <WebSocketsClient.h>

// WiFi credentials
const char* ssid = "Wise net/rida murad";
const char* password = "1234murad@";

const char* websocket_server = "192.168.1.104";
const uint16_t websocket_port = 3001;
const char* websocket_path = "/";

WebSocketsClient webSocket;

bool checkInSent = false;
unsigned long lastDataSendTime = 0;

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected. IP address: ");
  Serial.println(WiFi.localIP());

  // Setup WebSocket
  webSocket.begin(websocket_server, websocket_port, websocket_path);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();

  if (WiFi.status() != WL_CONNECTED) return;

  unsigned long now = millis();

  // Send periodic sensor data
  if (checkInSent && now - lastDataSendTime > 30000) {
    sendMasterSensorData();
    sendSlaveSensorData();
    lastDataSendTime = now;
  }
}

// function to execute certain code on certain events
void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_CONNECTED:
      Serial.println("WebSocket connected");
      sendMasterCheckIn();
      delay(1000);  // short delay
      sendSlaveCheckIn();
      checkInSent = true;
      break;

    case WStype_DISCONNECTED:
      Serial.println("WebSocket disconnected");
      checkInSent = false;
      break;

    case WStype_TEXT:
      Serial.printf("Received text: %s\n", payload);
      break;

    case WStype_BIN:
      Serial.println("Received binary data");
      break;
  }
}

// send master check In dummy data on connection
void sendMasterCheckIn() {
  uint8_t packet[23];
  packet[0] = 0x10;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID
  for (int i = 7; i < 23; i++) {
    packet[i] = i;  // Dummy token
  }

  webSocket.sendBIN(packet, 23);
  Serial.println("Master check-in sent");
}

// send slave check In dummy data on connection
void sendSlaveCheckIn() {
  uint8_t packet[13];
  packet[0] = 0x12;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID
  memcpy(&packet[7], "SLAV01", 5);  // Slave ID
  packet[12] = 0x01;                // Modbus ID

  webSocket.sendBIN(packet, 13);
  Serial.println("Slave check-in sent");
}

// send master sensor dummy data every 30 seconds 
void sendMasterSensorData() {
  uint8_t packet[25];
  packet[0] = 0x14;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID

  // Dummy voltage and power (L1, L2, L3)
  for (int i = 7; i < 25; i++) {
    packet[i] = i + 1;
  }

  webSocket.sendBIN(packet, 25);
  Serial.println("Master sensor data sent");
}

// send slave sensor dummy data every 30 seconds
void sendSlaveSensorData() {
  uint8_t packet[25];
  packet[0] = 0x16;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID
  memcpy(&packet[7], "SLAV01", 5);  // Slave ID
  packet[12] = 0x01;                // Modbus ID

  for (int i = 13; i < 25; i++) {
    packet[i] = i * 2;  // Dummy voltage, current, power, energy
  }

  webSocket.sendBIN(packet, 25);
  Serial.println("Slave sensor data sent");
}
