FROM public.ecr.aws/docker/library/node:18

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

# Use local or ECS env vars at runtime
CMD ["npm", "start"]
