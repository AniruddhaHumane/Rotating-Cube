
# Rotating-Cube
A javascript implementaton of a cube which can rotate in X and Y direction with the help of mouse drag.
While rotatiing if you hold the mouse button down on the screen it generates friction which slows the cube down.

The implementation highly uses computer graphics concepts.


##### Note: if markdown is not rendered properly here then copy this markdown file and paste it on https://stackedit.io/app# and click reader Mode at the centre.

## How the cube is implemented
check out following image

![Signed Cube](https://www.researchgate.net/profile/R_Casalbuoni/publication/43164708/figure/fig2/AS:341456834318362@1458421061772/The-figure-shows-the-vertices-and-corresponding-coordinates-of-the-cube-described-in-the.png)

Centre of the cube is the origin. With respect to the origin, if you plot all the points at distance 1 on all axis you get this cube. Similarly we can make the cube bigger by increasing the distance. that's what `edge` represents. basically $[x,y,z]$ distance of a certain point. Or you can say the projection of the point along each axis.

$\theta_x, \theta_y, \theta_z$  are the angles made by the cube with each axis.

If you transform these points to actual pixel values you get the cube. Converting to pixels is easy. As we know that the origin in a web page is at the top left corner. we need to transform that origin to the center of the page. hence on line `85` we did this
```javascript
[XYinEdge[0]+window.innerWidth/2,-XYinEdge[1]+window.innerHeight/2]
```
Now we just need to traverse all the vertices and create lines in between.

#### Why did I create an array of 16 vertices
Traverse all the points in the array one by one, This is done to simplify the edge drawing code. instead of manually drawing edges between all points. I have redrawn over some edges so that I can make a complete cube. The basically leads to readable for loop implementation of edge drawing `(line 89)`.

You can go through the for loop. You'll understand if above explanation is not clear.

## How the cube is Rotated
You can checkout this [Wikipedia](https://en.wikipedia.org/wiki/3D_projection#Mathematical_formula) article from where you can check how the 3d cube is projected onto the 2d screen.


to understand how these matrices are actually calculated, Assume a smaller entity, say a point. and try to scale your way to 3d. Consider follwing image in which a point $(x,y)$ is rotated along the $z$ axis by an angle $\theta$.  

![Rotation along an axis](http://jcsites.juniata.edu/faculty/rhodes/graphics/images/rotate1.gif)
Length of the line is $r$. 
Now using trigonometry, we can calcualte the projection of the point onto each axis. We have,
#### Projection of point $(x,y)$

$x = rcos(\phi)$

$y = rsin(\phi)$

<div style="text-align: right"> --- (1) </div>

#### Projection of point $(x',y')$

$x' = rcos(\phi + \theta)$

$y' = rsin(\phi + \theta)$

<div style="text-align: right"> --- (2) </div>

We know that,
$cos(A+B) = cos(A)cos(B)-sin(A)sin(B)$

$sin(A+B) = sin(A)cos(B)+cos(A)sin(B)$

Expanding formulae (2)

$rcos(\phi + \theta) = rcos(\phi)cos(\theta)-rsin(\phi)sin(\theta)$

$rsin(\phi + \theta) = rsin(\phi)cos(\theta)+rcos(\phi)sin(\theta)$

using formulae (1) and (2)

$x' = xcos(\theta)-ysin(\theta)$

$y' = xsin(\theta)+ycos(\theta)$


similarly, we can prove other matrices in the wikipedia article.

## How cube is animated
We need to check what the mouse drag distance is and accordingly with same speed rotate the cube.
Hence, on `mousedown`, `start` variable is set based on mouse position on screen. We need to rotate the cube as user drags along an axis hence on `mousemove` we need to calculate the distance mouse has move from start position. after calculating the distance `distX, distY` we need to add it to the angles so that cube rotates.

say $dx,dy,dz$ represent the infinitesimal changes in the angle of the cube. we need to add `distX, distY` to these. (note that we can rotate cube only in in the horizontle direction $x-axis$ and verticle direction $y-axis$, to rotate it along $z-axis$ we need to move mouse in an arc which is hard to detect. try doing this as an excercise. :stuck_out_tongue:)

`distX, distY` are in pixels hence they can be huge. hence I have multiplied them with the constant $0.00001$ to make the change really small. The value is calculated based on trial and error.

now we need to add it to the $\theta$ values to make the changes.

But this way $dx,dy,dz$ remain constant and cube will keep on rotating with constant speed. to slow it down gradually. we need to apply `drag = 0.9999`. This value is multiplied with $dx,dy,dz$ each time the animation is called so that $dx,dy,dz$ will go on decreasing. and eventually reach zero.

#### or do they ? :dizzy_face:
$dx,dy,dz$ never become zero. They keep on decresing. But they never reach zero. `window.requestAnimationFrame(AnimateCube);` keeps calling the function infinitely and actually the animation never stops. it keeps moving by really small values. We want our animation to stop.

that's why on `line 188 and 191` we have set $dx,dy,dz$ directly to zero when they get really small.
and when they become zero we need to remove the animation. Hence we have called `window.cancelAnimationFrame(t);`

## Applying the friction
In this part, When the cube is rotating. If we press the mouse on cube, the mouse press should act like breaks and the cube should slow down faster. This may sound tricky but it is actually very easy.

just add the event listener `mousedown` and increase the `drag` value by small amount. As the `drag` increase, $dx,dy,dz$ will go down faster. and hence cube will slow down faster.

## End Note

All the calculated values of $drag, initialAngles, multiplierToDragDistance$  are calculated based on trial and error.

------------------
Please star the repo if you find it helpful :blush:
---------------------
