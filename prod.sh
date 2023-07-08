# Production build script
cd frontend

# 1. Build the frontend
yarn build

# 2. Move files at the build root inside a root subdirectory
mkdir -p build/root
for file in $(ls build | grep -E -v '^(index\.html|static|root)$'); do
    mv "build/$file" build/root;
done

cd ..

cd backend

source "$HOME"/.envs/django-react/bin/activate
pip install -r requirements.txt

# 3. Build the backend
./manage.py collectstatic --no-input

cd ..
