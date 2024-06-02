import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { useGetServiceByIdQuery, useGetServicesQuery } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { ServiceItem } from "../components/service-item-component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";

interface ServicePageProps {}

export const ServicePage: FC<ServicePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetServicesQuery(); // Отримуємо всі сервіси

  if (error) {
    return (
      <ShowInfo type="error">
        <p>Упс, сталася помилка</p>
        <p>Спробуйте трохи пізніше</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>loading</p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  // Фільтрація даних за id
  const service = data.services.find(service => service.id === id);

  if (!service?.image) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  return (
    <div className="py-24 flex flex-col gap-16 dark:bg-darkGray ">
      <MainTitle darkken={false} size="md">
        {service.name}
      </MainTitle>
      <div className="lg:px-24 px-6">
        <ServiceItem {...service} />
      </div>
    </div>
  );
};