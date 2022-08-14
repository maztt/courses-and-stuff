import pygame
import os
import random

SCREEN_WIDTH = 500
SCREEN_HEIGHT = 800

IMAGE_PIPE = pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'pipe.png')))
IMAGE_BASE = pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'base.png')))
IMAGE_BACKGROUND = pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'bg.png')))
IMAGE_BIRD = [
    pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'bird1.png'))),
    pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'bird2.png'))),
    pygame.transform.scale2x(pygame.image.load(os.path.join('imgs', 'bird3.png')))
]

pygame.font.init()
GAME_FONT = pygame.font.SysFont('Arial', 50)


class Bird:
    IMGS = IMAGE_BIRD
    BIRD_ROTATION_MAX = 25
    BIRD_ROTATION_SPEED = 20
    BIRD_ROTATION_TIME = 5

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.ang = 0
        self.speed = 0
        self.height = self.y
        self.time = 0
        self.image_usage = 0
        self.image = self.IMGS[0]

    def jump(self):
        self.speed = -10.5
        self.time = 0
        self.height = self.y

    def move(self):
        # calculate flight distance
        self.time += 1
        distance = 1.5 * (self.time**2) + self.speed * self.time

        # animation distance
        if distance > 16:
            distance = 16
        elif distance < 0:
            distance -= 2

        self.y += distance

        # angle
        if distance < 0 or self.y < (self.height + 50):
            if self.ang < self.BIRD_ROTATION_MAX:
                self.ang = self.BIRD_ROTATION_MAX
        else:
            if self.ang > -90:
                self.ang -= self.BIRD_ROTATION_SPEED

    def display(self, screen):
        # image selection on the rotation
        self.image_usage += 1

        if self.image_usage < self.BIRD_ROTATION_TIME:
            self.image = self.IMGS[0]
        elif self.image_usage < self.BIRD_ROTATION_TIME*2:
            self.image = self.IMGS[1]
        elif self.image_usage < self.BIRD_ROTATION_TIME*3:
            self.image = self.IMGS[2]
        elif self.image_usage < self.BIRD_ROTATION_TIME*4:
            self.image = self.IMGS[1]
        elif self.image_usage >= self.BIRD_ROTATION_TIME*4 + 1:
            self.image = self.IMGS[0]
            self.image_usage = 0


        # falling down image
        if self.ang <= -80:
            self.image = self.IMGS[1]
            self.image_usage = self.BIRD_ROTATION_TIME*2

        # displaying image
        image_rotated = pygame.transform.rotate(self.image, self.ang)
        image_centralized = self.image.get_rect(topleft=(self.x, self.y)).center
        rect = image_rotated.get_rect(center=image_centralized)
        screen.blit(image_rotated, rect.topleft)

    def get_mask(self):
        return pygame.mask.from_surface(self.image)


class Pipe:
    DISTANCE = 200
    SPEED = 5

    def __init__(self, x):
        self.x = x
        self.height = 0
        self.pos_top = 0
        self.pos_base = 0
        self.PIPE_TOP = pygame.transform.flip(IMAGE_PIPE, False, True)
        self.PIPE_BASE = IMAGE_PIPE
        self.has_passed = False
        self.define_height()

    def define_height(self):
        self.height = random.randrange(50, 450)
        self.pos_top = self.height - self.PIPE_TOP.get_height()
        self.pos_base = self.height + self.DISTANCE

    def move(self):
        self.x -= self.SPEED

    def display(self, screen):
        screen.blit(self.PIPE_TOP, (self.x, self.pos_top))
        screen.blit(self.PIPE_BASE, (self.x, self.pos_base))

    def collide(self, bird):
        bird_mask = bird.get_mask()
        top_mask = pygame.mask.from_surface(self.PIPE_TOP)
        base_mask = pygame.mask.from_surface(self.PIPE_BASE)

        distance_top = (self.x - bird.x, self.pos_top - round(bird.y))
        distance_base = (self.x - bird.x, self.pos_base - round(bird.y))

        collision_top = bird_mask.overlap(top_mask, distance_top)
        collision_base = bird_mask.overlap(base_mask, distance_base)

        if collision_top or collision_base:
            return True
        else:
            return False


class Base:
    SPEED = 5
    WIDTH = IMAGE_BASE.get_width()
    IMAGE = IMAGE_BASE

    def __init__(self, y):
        self.y = y
        self.x1 = 0
        self.x2 = self.WIDTH

    def move(self):
        self.x1 -= self.SPEED
        self.x2 -= self.SPEED

        if self.x1 + self.WIDTH < 0:
            self.x1 = self.x2 + self.WIDTH
        if self.x2 + self.WIDTH < 0:
            self.x2 = self.x1 + self.WIDTH

    def display(self, screen):
        screen.blit(self.IMAGE, (self.x1, self.y))
        screen.blit(self.IMAGE, (self.x2, self.y))


def screen_display(screen, birds, pipes, base, score):
    screen.blit(IMAGE_BACKGROUND, (0, 0))
    for bird in birds:
        bird.display(screen)
    for pipe in pipes:
        pipe.display(screen)

    text = GAME_FONT.render(f"Score: {score}", True, (255, 255, 255))
    screen.blit(text, (SCREEN_WIDTH - 10 - text.get_width(), 10))
    base.display(screen)
    pygame.display.update()


def main():
    birds = [Bird(230, 350)]
    base = Base(730)
    pipes = [Pipe(700)]
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    score = 0
    timer = pygame.time.Clock()

    playing = True
    while playing:
        timer.tick(30)

        # user interaction
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                playing = False
                pygame.quit()
                quit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    for bird in birds:
                        bird.jump()


        # moving commands
        for bird in birds:
            bird.move()
        base.move()

        add_pipe = False
        remove_pipe = []
        for pipe in pipes:
            for i, bird in enumerate(birds):
                if pipe.collide(bird):
                    birds.pop(i)
                if not pipe.has_passed and bird.x > pipe.x:
                    pipe.has_passed = True
                    add_pipe = True
            pipe.move()
            if pipe.x + pipe.PIPE_TOP.get_width() < 0:
                remove_pipe.append(pipe)

        if add_pipe:
            score += 1
            pipes.append(Pipe(600))
        for pipe in remove_pipe:
            pipes.remove(pipe)

        for i, bird in enumerate(birds):
            if (bird.y + bird.image.get_height()) > 730 or bird.y < 0:
                birds.pop(i)

        screen_display(screen, birds, pipes, base, score)


if __name__ == '__main__':
    main()
