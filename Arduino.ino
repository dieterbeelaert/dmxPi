#include <DmxSimple.h>
#include <DmxSimple.h>

int DMX_dir = 4;
int LED2 = 8;



void setup() {

  pinMode(DMX_dir, OUTPUT);
  pinMode(LED2, OUTPUT);
  digitalWrite(DMX_dir, HIGH);
  DmxSimple.usePin(2);
  Serial.begin(9600);
  Serial.println("SerialToDmx ready");
  Serial.println();
  Serial.println("Syntax:");
  Serial.println(" 123c : use DMX channel 123");
  Serial.println(" 45w  : set current channel to value 45");
}

int value = 0;
int channel;

void loop() {
//  for(int i = 29; i < 37;i++)
//  {
//    for(int b = 0; b < 255; b+=10)
//    {
//      DmxSimple.write(i,b);
//      delay(1);
//    }
//    for(int b = 255; b >0; b-=10)
//    {
//      DmxSimple.write(i,b);
//      delay(1);
//    }
  //}
  int c;

  while(!Serial.available());
  c = Serial.read();
  if ((c>='0') && (c<='9')) {
    value = 10*value + c - '0';
  } else {
    if (c=='c') channel = value;
    else if (c=='w') {
      DmxSimple.write(channel, value);
      Serial.println("send channel");
      Serial.print(channel);
    }
    value = 0;
  }

}
