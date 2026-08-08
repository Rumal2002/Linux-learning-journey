📝 Day 24 - Docker Hub Image Publishing Notes

What is Docker Hub?

Docker Hub is the official cloud-based registry for storing, sharing,versioning, and distributing Docker images.

It allows developers to:

Store Docker images

Share images publicly or privately

Pull images from anywhere

Integrate with CI/CD pipelines

Docker Registry

A Docker registry stores Docker images.

Common registries:

Docker Hub

GitHub Container Registry (GHCR)

Amazon ECR

Google Artifact Registry

Azure Container Registry

Image Naming Convention

Format:

USERNAME/REPOSITORY:TAG

Example:

rumalmedagedara/day24-node-app:1.0.0

Components:

Username

Repository

Tag

Image Tags

Tags identify different versions of the same image.

Examples:

latest
v1
1.0.0
1.0.1
2.0.0

Avoid relying only on latest in production because explicit versionsmake deployments and rollbacks easier.

Semantic Versioning

Pattern:

MAJOR.MINOR.PATCH

Example:

1.0.0
1.0.1
1.1.0
2.0.0

MAJOR → breaking changes

MINOR → new backward-compatible features

PATCH → bug fixes

Docker Login

Authenticate with Docker Hub:

docker login

Logout:

docker logout

Docker Push

Uploads a local image to a registry.

docker push USERNAME/day24-node-app:1.0.0

Docker Pull

Downloads an image from a registry.

docker pull USERNAME/day24-node-app:1.0.0

Public vs Private Repositories

Public

Anyone can pull images

Great for learning and portfolios

Easy collaboration

Private

Restricted access

Suitable for company projects

Better for proprietary applications

Image Digest

Every pushed image receives an immutable digest.

Example:

sha256:xxxxxxxxxxxxxxxxxxxxxxxx

The digest uniquely identifies image content.

Best Practices

Use meaningful repository names

Use semantic version tags

Keep Dockerfiles simple

Publish README documentation

Scan images regularly

Rebuild images with updated base images

Never store passwords or API keys inside images

Common Mistakes

Using only latest

Forgetting to tag before pushing

Pushing the wrong repository

Including secrets in images

Using overly large base images

Useful Commands

docker login
docker logout
docker tag
docker push
docker pull
docker search
docker image ls
docker image inspect
docker history
docker system df

Interview Questions

What is Docker Hub?

The official registry used to store and distribute Docker images.

Difference between docker push and docker pull?

push uploads an image.

pull downloads an image.

Why use tags?

To identify specific versions of an image.

Why avoid only using latest?

Specific tags improve reproducibility and rollback.

What is a Docker registry?

A service that stores and distributes container images.

Day 24 Summary

During Day 24 I learned how to publish Docker images professionallyusing Docker Hub.

Practical skills covered:

Docker Hub account setup

Docker CLI authentication

Image naming

Image tagging

Semantic versioning

Image publishing

Image downloading

Repository management

Docker Hub workflow

Best practices for image distribution

These skills form the foundation for publishing images that can later beused in CI/CD pipelines, Kubernetes deployments, and cloud platforms.
