# Episode 06 — Persistent Storage and Recovery

Once the Docker workspace was working, I had to solve an important problem.

A Docker container can be removed and recreated.

But I didn't want that to mean losing everything inside the workspace.

If a user created files inside their development environment, those files should survive when the container was stopped or recreated.

## Introducing Docker volumes

I learned that the solution was to separate the container from its data.

Instead of storing the workspace data only inside the container's writable filesystem, I created a persistent Docker volume for each workspace.

The relationship became:

```text
Workspace
   │
   ├── Docker Container
   │
   └── Persistent Volume
```

The container can disappear.

The volume remains.

That meant I could create a new container and attach the existing volume to it.

## Connecting the volume to the workspace

I added a volume name to the workspace data stored in PostgreSQL.

This gave the application a way to know which persistent Docker volume belonged to each workspace.

The flow became:

```text
Create workspace
      ↓
Create database record
      ↓
Create persistent volume
      ↓
Create Docker container
      ↓
Attach volume
```

Now the workspace had both an application identity in PostgreSQL and persistent storage in Docker.

## Testing persistence

I wanted to make sure this wasn't just working theoretically.

I created a workspace, started it, and used the terminal to create data inside it.

Then I stopped the workspace and started it again.

The data was still there.

That was an important test because it proved that the container lifecycle and the data lifecycle were no longer the same thing.

```text
Container stopped
      ↓
Volume remains
      ↓
Container started again
      ↓
Same volume attached
      ↓
Data still available
```

## Handling a missing container

I also wanted the application to handle a situation where the container itself no longer existed.

The database still knows that the workspace exists.

The persistent volume can still exist.

So the backend can create a new container and attach the existing volume.

The important part is that the data belongs to the workspace, not to one specific container instance.

This was probably one of the most useful things I learned from the Docker part of the project.

I had initially thought about a container as the workspace.

Now I was starting to see it differently:

### The container is the runtime environment. The volume is where the persistent workspace data lives.

## Recovery flow

The resulting recovery concept became:

```text
Workspace exists in PostgreSQL
          ↓
Container missing
          ↓
Create new container
          ↓
Attach existing volume
          ↓
Workspace available again
```

This also influenced the backend service layer.

Creating a workspace wasn't simply a database operation anymore.

The service had to coordinate PostgreSQL and Docker and make sure the resources were connected correctly.

## What I learned

This was the point where I started understanding why persistent storage matters so much when working with containers.

Containers are useful because they are isolated and replaceable.

That becomes much more useful when the important data is stored separately.

For this project, that meant I could treat the Docker container as something that could be stopped, recreated, or replaced without automatically losing the user's workspace data.

The workspace was now becoming a much more realistic development environment.

The next challenge was making that environment properly usable from the web application.