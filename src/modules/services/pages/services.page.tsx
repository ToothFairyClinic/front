import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { useGetServiceByIdQuery } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { ServiceItem } from "../components/service-item-component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { Helmet } from "react-helmet-async";


interface ServicePageProps { }

export const ServicePage: FC<ServicePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetServiceByIdQuery({
    variables: {
      _eq: id,
    },
  });
  const service = data?.services[0];


  if (error) {
    return (
      <ShowInfo type="error">
        <p>Упс, спалася помилка</p>
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

  if (!service?.image) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.seo_title || `${service.name} | Стоматологія Зубна Фея`}</title>

        <meta
          name="description"
          content={service.seo_description || `Дізнайтеся більше про послугу ${service.name} у клініці Зубна Фея.`}
        />

        <link rel="canonical" href={`https://toothfairy.clinic/services/${id}`} />
      </Helmet>

      <div className="py-24 flex flex-col gap-16 dark:bg-darkGray ">

        <MainTitle darkken={false} size="md">
          {service.name}
        </MainTitle>
        <div className="lg:px-24 px-6">
          <ServiceItem {...service} />
        </div>
      </div>
    </>

  );
};
