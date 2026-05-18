// HC-SR04 + buzzer

// Aansluitingen:

// VCC sensor  -> 5V Arduino

// GND sensor  -> GND Arduino

// TRIG sensor -> D2 Arduino

// ECHO sensor -> D4 Arduino

// BUZZER +    -> D13 Arduino

// BUZZER -    -> GND Arduino
 
const int trigPin = 4;

const int echoPin = 2;

const int buzzerPin = 13;
 
float duration;

float distance;
 
void setup() {

  pinMode(trigPin, OUTPUT);

  pinMode(echoPin, INPUT);

  pinMode(buzzerPin, OUTPUT);
 
  Serial.begin(9600);

}
 
void loop() {
  // Echo meten
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH); //echo aan?
 
  // Afstand berekenen

  distance = (duration*.0343)/2;
 
  Serial.print("Afstand: ");

  Serial.print(distance);

  Serial.println(" cm");

  if (distance < 7) {

    digitalWrite(buzzerPin, HIGH);

    delay(500);
 
    digitalWrite(buzzerPin, LOW);

    delay(500);

  }
 
 
  else if (distance > 20) {

    digitalWrite(buzzerPin, LOW);

    delay(100);

  }

  else if (distance < 20) {

    digitalWrite(buzzerPin, HIGH);

    delay(100);
 
    digitalWrite(buzzerPin, LOW);

    delay(900);

  }

  
}
 
