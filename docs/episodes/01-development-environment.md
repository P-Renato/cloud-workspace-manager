# Episode 01 — Development Environment

When I started this project, I wanted to build it in a way that would give me experience beyond just writing application code.

I wanted to work with virtual machines, Linux, networking, Docker, and eventually cloud-style infrastructure.

My first idea was to have a separate VM for each environment. The problem was that my VMs were mostly CLI-based, while I still wanted the normal VS Code development experience.

Editing React frontend and backend files directly through a terminal and then checking the changes on a live server would quickly become painful.

At first, I thought I could simply keep VS Code on my host machine and transfer the files to the VM using SSH keys.

Then I discovered something much better: **VS Code Remote SSH**.

## Setting up the development VM

I created an Ubuntu development VM and configured SSH access to it.

I then added an entry to my local `~/.ssh/config` file:

```text
Host dev-workspace
    HostName 192.168.122.117
    User cloud-workspace
    IdentityFile ~/.ssh/cloud-workspace-dev
```

This meant I could connect using:

`ssh dev-workspace`

instead of having to enter the complete connection details every time.

The `IdentityFile` points to the private SSH key used for authentication.

## VS Code Remote SSH

The really useful part was connecting VS Code directly to the VM using the Remote SSH extension.

This allowed me to keep using VS Code on my local machine while the actual project files lived inside the Ubuntu VM.

So I could work with the VM almost as if it were my local development environment:

```text
My computer
     │
     │ VS Code Remote SSH
     ▼
Ubuntu development VM
     │
     └── Project files
```

This was much more convenient than constantly copying files between machines.

## Git workflow

Once the development environment was working, I initialized the project as a Git repository and started using GitHub for version control.

My workflow became much simpler:

```text
Edit code in VS Code
        ↓
Git add
        ↓
Git commit
        ↓
Git push
        ↓
GitHub
```

I no longer needed to manually copy files into the VM with scp just to continue working on the project.

## What I learned

This was one of the first moments where the project started feeling different from a normal frontend or backend exercise.

I wasn't just learning how to write code. I was learning how the development environment itself could be designed.

The combination of Linux, SSH, virtual machines, VS Code Remote SSH, and Git gave me a much better foundation for everything that came later.

And, more importantly, I discovered that I actually enjoyed working this way.