#include <Arduino.h>
#include <M5Stack.h>
#include <paj7620.h>
#include <Gesture.h>

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Gesture
#define GES_REACTION_TIME 500
#define GES_ENTRY_TIME 800
#define GES_QUIT_TIME 1000

paj7620 Gesture;

// WiFi credentials.
const char *WIFI_SSID = "Buffalo-G-918E";
const char *WIFI_PASS = "e45kixcxtkred421221214";

#include "esp_wpa2.h" //wpa2 library for connections to Enterprise networks
// #define EAP_IDENTITY "20FI094"                 // 学籍番号
// #define EAP_USERNAME "20FI094"                 // 学籍番号
// #define EAP_PASSWORD "Que_sera7760"            // 大学パスワード
// const char *ssid = "TDU_MRCL_WLAN_DOT1X_2.4G"; // SSID
int counter = 0; // タイムアウト監視用

// MQTT credentials.
const char *brokerAdr = "test.mosquitto.org";
const int brokerPort = 1883;
const char *topic = "/gesture";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

// prototypes
void reconnect();

void setup()
{
  M5.begin();
  Serial.begin(115200);

  // 初期画面
  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.setCursor(0, 0);   // 文字表示の左上位置を設定
  M5.Lcd.setTextColor(RED); // 文字色設定(背景は透明)(WHITE, BLACK, RED, GREEN, BLUE, YELLOW...)
  M5.Lcd.setTextSize(2);    // 文字の大きさを設定（1～7）
  M5.Lcd.println("Gesture Demo Running");
  delay(5000);

  // Gesture initialize
  if (Gesture.init())
  {
    Serial.println("PAJ7620U2 initialization failed");
  }
  Serial.println("Please input your gestures:\n");

  // wifi connect
  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.print("Connecting to Network...");

  WiFi.disconnect(true); // disconnect form wifi to set new wifi connection
  WiFi.mode(WIFI_STA);   // init wifi mode

  // WiFi.begin(ssid, WPA2_AUTH_PEAP, EAP_IDENTITY, EAP_USERNAME, EAP_PASSWORD);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  delay(1000);

  // 接続できなかった際のタイムアウト処理
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
    counter++;
    if (counter >= 60)
    { // after 30 seconds timeout - reset board
      ESP.restart();
    }
  }

  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.print("Start WiFi \nand Publish");

  // MQTT初期接続
  mqttClient.setServer(brokerAdr, brokerPort);
  delay(3000);
  reconnect();
  delay(1000);
}

void loop()
{
  M5.update();
  M5.Lcd.fillScreen(WHITE);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.print("Make Some Gesture");

  paj7620_gesture_t result;
  if (Gesture.getResult(result))
  {
    switch (result)
    {
    case UP:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "UP");
      delay(GES_QUIT_TIME);
      break;
    case DOWN:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "DOWN");
      delay(GES_QUIT_TIME);
      break;
    case LEFT:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "LEFT");
      delay(GES_QUIT_TIME);
      break;
    case RIGHT:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "RIGHT");
      delay(GES_QUIT_TIME);
      break;
    case PUSH:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "PUSH");
      delay(GES_QUIT_TIME);
      break;
    case POLL:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "POLL");
      delay(GES_QUIT_TIME);
      break;
    case CLOCKWISE:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "CLOCKWISE");
      delay(GES_QUIT_TIME);
      break;
    case ANTI_CLOCKWISE:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "ANTI_CLOCKWISE");
      delay(GES_QUIT_TIME);
      break;
    case WAVE:
      delay(GES_ENTRY_TIME);
      mqttClient.publish(topic, "WAVE");
      delay(GES_QUIT_TIME);
      break;
    default:
      break;
    }
  }
  delay(100);
}

void reconnect()
{
  while (!mqttClient.connected())
  {
    if (!mqttClient.connect("M5StickCPlus"))
    {
      delay(5000);
    }
  }
}
