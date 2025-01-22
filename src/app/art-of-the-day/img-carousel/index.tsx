import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function ImgCarousel({ imgs }: { imgs: string[] }) {
  return (
    <Carousel
      className="w-full h-full"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent>
        {imgs.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-2">
                  <div className="relative w-full h-[20rem] xl:h-[25rem] 2xl:h-[40rem] overflow-hidden">
                    <Image
                      src={img}
                      alt={`Image ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      unoptimized={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
