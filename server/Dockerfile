# Use the official AWS Lambda Node.js 18 base image
FROM public.ecr.aws/lambda/nodejs:18

# Set working directory
WORKDIR /var/task

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code
COPY dist ./dist
COPY prisma ./prisma
RUN npx prisma generate

# (Optional) If you need to run Prisma migrations, include them here
# RUN npx prisma migrate deploy

# Set the CMD to your handler
CMD ["dist/app.handler"]