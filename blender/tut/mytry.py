import bpy
# plane1 save
verts = [(-5,3,5),(-5,3,-5),(5,3,-5),(5,3,5),(-5,3.2,5),(-5,3.2,-5),(5,3.2,-5),(5,3.2,5)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)

# plane2 save
verts = [(-5,-3,5),(-5,-3,-5),(5,-3,-5),(5,-3,5),(-5,-3.2,5),(-5,-3.2,-5),(5,-3.2,-5),(5,-3.2,5)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)

# --- planes : Save
verts1 = [(-5,5,5),(-5,5,-5),(-5,-5,-5),(-5,-5,5),(5,5,5),(5,5,-5),(5,-5,-5),(5,-5,5)]
faces1 = [(0,1,2,3),(4,5,6,7)]

mymesh = bpy.data.meshes.new("Cube1")
myobject = bpy.data.objects.new("Cube1", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts1,[],faces1)
mymesh.update(calc_edges=True)


# -- cube1 save
verts = [(0,3.2,0),(0,4.2,0),(1,4.2,0),(1,3.2,0),(0,3.2,1),(0,4.2,1),(1,4.2,1),(1,3.2,1)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)

# -- cube2 save
verts = [(-5,3.2,0),(-5,4.2,0),(-4,4.2,0),(-4,3.2,0),(-5,3.2,1),(-5,4.2,1),(-4,4.2,1),(-4,3.2,1)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)

# cube3 save
verts = [(-4,3.2,2),(-4,4.2,2),(-3,4.2,2),(-3,3.2,2),(-4,3.2,3),(-4,4.2,3),(-3,4.2,3),(-3,3.2,3)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)

# cube4 save
verts = [(4,-3.2,2),(4,-2.2,2),(3,-2.2,2),(3,-3.2,2),(4,-3.2,3),(4,-2.2,3),(3,-2.2,3),(3,-3.2,3)]
faces = [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)]

mymesh = bpy.data.meshes.new("Cube")
myobject = bpy.data.objects.new("Cube", mymesh)

bpy.context.scene.cursor.location = (0,0,0)
bpy.context.collection.objects.link(myobject)

mymesh.from_pydata(verts,[],faces)
mymesh.update(calc_edges=True)
