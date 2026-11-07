# Campus GLB assets

The campus scene loads the following third-party GLB models at runtime:

| Scene use | Asset | Runtime URL | License |
|---|---|---|---|
| Main Academy, Lecture Theatre, Examination Hall | University Building (lightweight, 16.8k triangles) | https://grab3d.com/dl/university-building/university-building.glb | CC0 1.0 |
| Grand Library | Library (19.9k triangles) | https://grab3d.com/dl/library/library.glb | CC0 1.0 |

Source pages:
- https://grab3d.com/models/buildings/university-building/
- https://grab3d.com/models/buildings/library/

The source pages identify both models as CC0 1.0, permitting commercial use without attribution. The app currently streams these files from the asset host; they are not vendored in this repository. Runtime availability and CORS headers depend on the asset host. If this project moves to production, mirror optimized copies under `public/models/` after downloading and validating the original files and license manifests.
