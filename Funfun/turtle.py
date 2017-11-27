import turtle
import math

turtle.setup(1000,1000)
window=turtle.Screen()
window.bgcolor('white')

def forward():
    print("Key Up")
    turtle1.forward(10)
def right():
    print("Right")
    turtle1.right(90)
def left():
    print("Left")
    turtle1.left(90)
def backward():
    print("Backward")
    turtle1.backward(10)

def iscollision(t1, t2):
    d = math.sqrt(math.pow(t1.xcor()-t2.xcor(),2)+ math.pow(t1.ycor()-t2.ycor(),2))
    if d < 20:
        return True
    elif():
        return False
window.listen()

#boarders
boarder=turtle.Turtle()
boarder.penup()
boarder.setposition(-450,-450)
boarder.pendown()
boarder.pensize(10)
boarder.pencolor('black')

for side in range(4):
    boarder.speed(100)
    boarder.forward(900)
    boarder.left(90)
boarder.hideturtle()

#Maze
Maze=turtle.Turtle()
Maze.pensize(10)
#Speed
Maze.speed(100)
#Line 1
Maze.penup()
Maze.setposition(0,-450)
Maze.pendown()
Maze.setposition(300,-450)
Maze.setposition(0,-450)
Maze.setposition(0,-250)
Maze.setposition(150,-250)
Maze.setposition(0,-250)
Maze.setposition(0,-50)
Maze.setposition(100,-50)
Maze.setposition(0,-50)
Maze.setposition(0,-450)
#Line 2
Maze.setposition(300,-450)
Maze.setposition(300,100)
Maze.setposition(300,150)
Maze.setposition(100,150)
Maze.setposition(300,150)
Maze.setposition(300,50)
Maze.setposition(100,50)
Maze.setposition(300,50)
Maze.setposition(300,-150)
Maze.setposition(100,-150)
Maze.setposition(300,-150)
Maze.setposition(300,-450)
#Line 3
Maze.setposition(450,-450)
Maze.setposition(450,450)
Maze.setposition(200,450)
Maze.setposition(200,400)
Maze.setposition(50,400)
Maze.setposition(50,350)
Maze.setposition(0,350)
Maze.setposition(0,400)
Maze.setposition(-200,400)
Maze.setposition(-200,350)
Maze.setposition(-275,350)
Maze.setposition(-275,400)
Maze.setposition(-275,250)

#Maze2
Maze2=turtle.Turtle()
Maze2.pensize(10)
#Speed
Maze2.speed(100)
#line 4
Maze2.penup()
Maze2.setposition(300,150)
Maze2.pendown()
Maze2.setposition(100,150)
Maze2.setposition(100,200)
Maze2.setposition(-200,200)
Maze2.setposition(-200,150)
Maze2.setposition(-350,150)
Maze2.setposition(-350,400)

#Maze3
Maze3=turtle.Turtle()
Maze3.pensize(10)
#Speed
Maze3.speed(100)
#line 5
Maze3.penup()
Maze3.setposition(-275,150)
Maze3.pendown()
Maze3.setposition(-275,0)
Maze3.setposition(-200,0)
Maze3.setposition(-200,50)
Maze3.setposition(-150,50)
Maze3.setposition(-150,100)
Maze3.setposition(-100,100)
Maze3.setposition(-100,150)
Maze3.setposition(-50,150)
Maze3.setposition(-100,150)
Maze3.setposition(-100,100)
Maze3.setposition(-150,100)
Maze3.setposition(-150,50)
Maze3.setposition(-200,50)
Maze3.setposition(-200,0)
Maze3.setposition(-275,0)
Maze3.setposition(-275,-150)
Maze3.setposition(-350,-150)
Maze3.setposition(-275,-150)
Maze3.setposition(-275,-250)
Maze3.setposition(-350,-250)
Maze3.setposition(-200,-250)
Maze3.setposition(-200,-350)
Maze3.penup()
Maze3.setposition(-300,-450)
Maze3.pendown()
Maze3.setposition(-300,-350)
Maze3.setposition(-300,-450)
Maze3.setposition(-100,-450)
Maze3.setposition(-100,-350)
Maze3.setposition(-100,-450)
Maze3.setposition(450,-450)
Maze3.setposition(450,250)
Maze3.setposition(200,250)
Maze3.setposition(450,250)
Maze3.setposition(450,450)
Maze3.setposition(300,450)
Maze3.setposition(300,300)
Maze3.setposition(300,350)
Maze3.setposition(350,350)
Maze3.penup()
Maze3.setposition(-450,0)
Maze3.pendown()
Maze3.setposition(-350,0)
Maze3.penup()
Maze3.setposition(0,-200)
Maze3.pendown()
Maze3.setposition(-100,-200)
Maze3.setposition(-100,-100)
Maze3.setposition(-150,-100)

#end goal
goal=turtle.Turtle()
goal.color('gold')
goal.shape('circle')
goal.penup()
goal.setposition(375,-350)

turtle1=turtle.Turtle()
turtle1.color('black')
turtle1.shape("turtle")
turtle1.penup()
turtle1.setposition(100,-300)
window.onkey(forward,"Up")
window.onkey(right,"Right")
window.onkey(left,"Left")
window.onkey(backward,"Down")
window.listen()

while True:
    #boundary check
    if turtle1.xcor()> 450 or turtle1.xcor()< -450:
        turtle1.right(180)
    if turtle1.ycor()> 450 or turtle1.ycor()< -450:
        turtle1.right(180)
##    if iscollision(turtle1, goal):
##        goal.hideturtle()
##    if iscollision(turtle1, Maze):
##        turtle1.right(180)
##    if iscollision(turtle1, Maze2):
##        turtle1.right(180)
##    if iscollision(turtle1, Maze3):
##        turtle1.right(180)