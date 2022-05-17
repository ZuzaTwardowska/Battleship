FROM mcr.microsoft.com/dotnet/sdk:5.0.103 AS build
WORKDIR /build

EXPOSE 80

COPY ./*.csproj .
RUN dotnet restore "battleship-backend.csproj"

COPY . .
WORKDIR /build
RUN dotnet publish "battleship-backend.csproj" -c release -o published

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /build/published ./
ENTRYPOINT ["dotnet", "battleship-backend.dll"]