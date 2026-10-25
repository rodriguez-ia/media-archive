package com.isaiah.mediaarchive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class AsyncCommunityDashboardConfig {

    @Bean(name = "communityDashboardExecutor")
    public ThreadPoolTaskExecutor communityDashboardExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        executor.setCorePoolSize(3);
        executor.setMaxPoolSize(3);
        executor.setQueueCapacity(20);
        executor.setThreadNamePrefix("dashboard-");

        return executor;
    }
}
