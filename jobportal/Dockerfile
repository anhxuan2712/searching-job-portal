FROM maven:3.9-eclipse-temurin-11 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -B -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:11-jre-jammy

WORKDIR /app

RUN useradd --system --uid 10001 --create-home appuser

COPY --from=build /app/target/*.jar app.jar

RUN mkdir -p /app/uploads /app/tmp && chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
