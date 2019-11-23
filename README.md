# map675-module-02-KY-Boat ramps
Location of Kentucky Boat ramps by county boundaries.

### Data
1. [Kentucky Boundary file](https://www.uky.edu/KGS/gis/bounds.htm)
2. [Kentucky boat ramp data](https://kygeoportal.ky.gov/geoportal/catalog/search/resource/details.page?uuid=%7BAF984DFA-6682-44FA-A9C0-BED216E1989D%7D)

Node methods used
1. [shp2json](https://www.npmjs.com/package/shp2json)
2.

### Process Data
Data shapefiles processed with QGIS 3.8.3 use dissolved to merge polygon in Kentucky boundary shapefile
by Region attribute. Created counts with counts points in polygon vector tool. Issue with 58 points that are on the Ohio River are outside the Kentucky boundary polygons have null values. 
